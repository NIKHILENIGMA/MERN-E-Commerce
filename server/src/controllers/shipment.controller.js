import { Shipment } from '../models/shipment.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { isValidObjectId } from 'mongoose';


export const createShipment = asyncHandler(async (req, res) => {
    const { address, city, state, postalCode, country } = req.body

    const customerId = req.customer._id

    try {
        if (!customerId) {
            throw new ApiError(
                403,
                "You are not authorized"
            )
        }

        if (
            [address, city, state, postalCode, country].some(field => field.trim() === "")
            ) {
            throw new ApiError(
                404,
                "All fields are required"
            )
        }

        const newShipment = await Shipment.create({
            address,
            city,
            state,
            postalCode,
            country,
            customerId
        })

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newShipment,
                "Successfully user shipment address added"
            )
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            `Error occured while creating shipment :: Due to :: ${errorMessage}` 
            || "create shipment failed"
        )
    }
});



export const getShipmentById = asyncHandler(async (req, res) => {
    const customerId = req.customer._id

    if (!customerId) {
        throw new ApiError(
            400,
            "User not authorized"
        )
    }
    try {
        
        const getCustomerDetails = await Shipment.aggregate([
            {
                $match: {
                    customerId: customerId,
                }
            },
            {
                $project: {
                    _id: 1,
                    address: 1,
                    city: 1,
                    state: 1,
                    country: 1,
                    postalCode: 1,
                    customerId: 1

                }
            }
        ])

        if (!getCustomerDetails) {
            throw new ApiError(
                400, 
                "Customer does not filled his/her personal details"
            )
        }

        const shipmentResponse = getCustomerDetails.length > 0 ? getCustomerDetails[0] : null
        // console.log(getCustomerDetails)

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                shipmentResponse,
                "Successfully fetched the shipment details"   
            ) 
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500, 
            `Error occured while fetching shipment details :: Reason :: ${errorMessage}` || "Fetching the shipment details failed"
        )
    }    
});


export const updateShipmentDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { address, city, state, postalCode, country } = req.body

    if (!isValidObjectId(id)) {
        throw new ApiError(
            400, 
            "Invalid shipment objectId"
        )
    }

    if (!(address || city || state || postalCode || country)) {
        throw new ApiError(
            400,
            "No data provided for personal details updation"
        )
    }


    try {
        
        const updateDetails = await Shipment.findByIdAndUpdate(
            id,
            {
                $set: {
                    address, 
                    city, 
                    state, 
                    postalCode, 
                    country
                }
            },
            {
                new: true,
            }
        )

        if (!updateDetails) {
            throw new ApiError(
                400,
                "Customer details failed to update"
            )
        }

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updateDetails,
                "Customer shipment details updated successfully"
            )
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            `Error occured while updating the shipment details :: Reason :: ${errorMessage}` || "Updation of the shipment details failed"
        )
    }
});


export const deleteShipment = asyncHandler(async (req, res) => {
    const { id } = req.params


    if (!isValidObjectId(id)) {
        throw new ApiError(
            400, 
            "Invalid shipment objectId"
        )
    }

    try {
        
        const destroyDetails = await Shipment.findByIdAndDelete(id)

        if (!destroyDetails) {
            throw new ApiError(
                404,
                "Customer shipment details not found and could not be removed"
            )
        }

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                destroyDetails,
                "Customer shipment details removed successfully"
            )
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            `Error occured while destroying the shipment details :: Reason :: ${errorMessage}` 
            || "Deletion of the shipment details failed"
        )
            
    }
});





