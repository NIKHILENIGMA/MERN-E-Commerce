import mongoose, { isValidObjectId } from "mongoose";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const createReview = asyncHandler(async (req,res) => {
    try {
        const { productId } = req.params
        const { rating, comment } = req.body
        const owner = req.user 
        
        if (!isValidObjectId(productId)) {
            throw new ApiError(
                404,
                "Invalid product-id",
            )
        }

        if (rating === undefined && !comment?.trim()) {
            throw new ApiError(
                400,
                "Please provide a rating or comment to this product"
            )
        }
        console.log();

        const reviews = await Review.create({
            product: productId, 
            rating, 
            comment,
            owner: owner?._id?.toString()
  
        })

        res
        .status(201)
        .json(
            new ApiResponse(
                201,
                reviews,
                "Your review has been successfully published "
            )
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            errorMessage || "Review publishment failed!!"
        )
    }



})
const updateReview = asyncHandler(async (req,res) => {
    const { reviewId } = req.params
    const { rating, comment } = req.body

    if ( !isValidObjectId(reviewId) ) {
        throw new ApiError(
            404,
            "Invalid review id provided",
        )
    }

    if (!comment?.trim()) {
        throw new ApiError(
            400,
            "comment is required"
        )
    }

    if (rating === "" || rating === null) {
        throw new ApiError(
            400,
            "Invalid rating provided"
        )
    }
    try {
    
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                $set: {
                    rating,
                    comment,
                }
            },
            {
                new: true,
            }
        )
    
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedReview,
                "Comment successfully updated"
            )
        )
 
   } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            errorMessage || "Review updation failed"
        )
   }
})
const deleteReview = asyncHandler(async (req,res) => {
    const { reviewId } = req.params
    if ( !isValidObjectId(reviewId) ) {
        throw new ApiError(
            404,
            "Invalid review-id provide"
        )
    }
    try {
        const destroyReview = await Review.findByIdAndDelete(reviewId)
    
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                destroyReview,
                "You review successfully removed"
            )
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            errorMessage || "Review deletion failed",
        )
    }
})
const getReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    // console.log(productId);

    if (!isValidObjectId(productId)) {
        throw new ApiError(
            404,
            "Provided product-id is not valid"
        );
    }

   
    if (Number(page) < 1 || Number(limit) < 1) {
        throw new ApiError(
            400,
            "Page and limit must be greater than 0"
        );
    }

    const skip = (Number(page) - 1) * Number(limit);

    const id = String(productId)

    try {
        // Total number of reviews for a product
        const totalDocuments = await Review.aggregate([
            {
                $match: {
                    product: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $count: "totalNoOfReviews",
            },

            
        ]);
        // console.log(totalDocuments[0]);
        const review = await Review.aggregate([
            {
                $match: {
                    product: new mongoose.Types.ObjectId(id),
                },

            },
            {
                $skip: skip
            },
            {
                $limit: Number(limit)
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails",
                }
            },
            {
                $addFields: {
                    ownerDetails:{
                        $first: "$ownerDetails"
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    comment: 1,
                    rating: 1,
                    createdAt: 1,
                    "ownerDetails._id": 1,
                    "ownerDetails.username": 1,
                    "ownerDetails.fullName": 1,
                }
            }


        ])

        console.log(review);

        if (!review) {
            throw new ApiError(
                404,
                "Reviews does not exist for this products"
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    totalReviews : totalDocuments.length > 0 ? totalDocuments[0] : 0,
                    review: review 
                },
                "Successfully fetched reviews",
            )
        );
    } catch (error) {
        const errorMessage = error.message;
        throw new ApiError(
            500,
            errorMessage || "Problem while fetching the reviews",
        );
    }
});



export {
    createReview,
    updateReview,
    deleteReview,
    getReviews,

}
