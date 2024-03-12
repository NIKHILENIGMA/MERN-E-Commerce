import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";


const createProduct = asyncHandler(async (req, res) => {
    const { 
        title,
        brand,
        description,
        price,
        category,
        quantity,
    } = req.fields

    if (!title) {
        throw new ApiError(
            401,
            "Product must have a title"
        )
    }
    if (!brand) {
        throw new ApiError(
            401,
            "Product must have a brand"
        )
    }
    if (!description) {
        throw new ApiError(
            401,
            "Product must have a description"
        )
    }
    if (!price || price < 0) {
        throw new ApiError(
            401,
            "Product must have a non-negative price" 
        )
    }
    if (!quantity || quantity < 0) {
        throw new ApiError(
            401,
            "Product must have a quantity"
        )
    }
    if (!category) {
        throw new ApiError(
            401,
            "Product must have a category"
        )
    }

    const newProduct = await Product.create({
        title, 
        brand, 
        description, 
        price, 
        category,
        quantity,
    })


    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            newProduct,
            "New Product created succefully!"
        )
    )
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const updateFields = req.fields

        if (Object.keys(updateFields).length === 0) {
            throw new ApiError(
                400,
                "No  update fields are provided"
            )
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: updateFields
                
            },
            {
                new: true, // Return the updated document
            }
        ).select("-createdAt -updatedAt -rating -numReviews -reviews")
        
        if (!updateProduct) {
            throw new ApiError (
                401, 
                "Product not found"
            )
        }
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedProduct,
                "Product details updated succefully"

            )
        )
    
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500, 
            errorMessage
        )
    }
});

const getProduct = asyncHandler(async (req, res) => {

    try {
            const { id }= req.params
        
            if (!id) {
                throw new ApiError(
                    400,
                    "Invalid id provided"
                )
            }
        
            const product = await Product.findById(id)
        
            if (!product) {
                throw new ApiError(
                    404,
                    "Product does exist"
                )
            }
        
            res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    product,
                    "Successfully fetched the product"
                )
            )
    } catch (error) {
        const errorMessage = error.message || "An error occurred while fetching the product"; 
        throw new ApiError(
            500,
            errorMessage 
        )
    }
    }) 

const destroyProduct = asyncHandler(async (req, res) => {
    try {
        const { id }= req.params
    
        if (!isValidObjectId(id)) {
            throw new ApiError(
                400,
                "Invalid id provided"
            )
        }
    
        const deletedProduct = await Product.findByIdAndDelete(id)
        
        if (!deletedProduct) {
            throw new ApiError(
                404,
                "Product does not exist or already deleted"
            )
        }
        
        // console.log(deletedProduct);
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Product deleted successfully"
            )
        )
} catch (error) {
    const errorMessage = error?.message || "An error occurred while deletion of the product"; 
    throw new ApiError(
        500,
        errorMessage 
    )
}
}) 

const allProducts = asyncHandler(async (_, res) => {
    try {
        const products = await Product.find({});
    
        if (!products || products.length === 0) {
            throw new ApiError(
                404, 
                "No products found")
        }
    
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                products,
                "All products fetched successfully"
            )
        )
    } catch (error) {
        const  errorMessage = error?.message || "Error occured while getting all the products"
        throw new ApiError(
            500, 
            errorMessage
        )
    }
})

const createReview = asyncHandler(async (req, res) => {
    const { title, description, } = req.query
})




export {
    createProduct,
    updateProduct,
    getProduct,
    destroyProduct,
    allProducts,
    createReview
}


