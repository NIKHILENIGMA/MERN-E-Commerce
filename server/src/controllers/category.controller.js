import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createCategory = asyncHandler(async ( req, res ) => {
    try {
        const { name } = req.body

        // Check if category name is provided or not  
        if (!name) {
            throw new ApiError (401, "Category name is required!!")
        }

        // Check if category is already created or not
        const existingCategory = await Category.findOne({name})
        if (existingCategory) {
            throw new ApiError (409, "Category already exists!")
        }

        const category = await Category.create({
            name
        });

        console.log(`Category created successfully: ${category.name}`); 
        
        res
        .status(201)
        .json(
            new ApiResponse(
                201,
                category,
                "Category created successfully"
            )
        )
    

    } catch (error) {   
        throw new ApiError(
            401,
            error?.message || "Category not created"
        )
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    // Extrating the category name and Id from the express request object 
    
    
    try {
        const { name }= req.body
        const { id: categoryID} = req.params
 

        if (!name) {
            throw new ApiError(
                400,
                "Category name is required!"
            )
        }
    
        // Find the category by its ID
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryID,
            {
                $set: {
                    name
                },
            },
            {
               new: true 
            }
        )
        
        console.log(`${name} category name updated to:  ${updatedCategory.name}`)
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedCategory,
                "Category updated succefully!"
            )
        )
} catch (error) {
    throw new ApiError(
        401, 
        "Catergory updation failed" ||  error?.message
    )
}

});


const destroyCategory = asyncHandler(async ( req, res ) => {
    const { id } = req.params

    try {
        if (!id) {
            throw new ApiError(
                400,
                "Please send a valid id",
            )
        }
    
        const deletedCategory = await Category.findByIdAndDelete(id)
        
        if (!deletedCategory) {
            throw new ApiError(
                404,
                "Category not found"
                )
        }
        console.log(`Deleted category: ${deletedCategory.name}`);
        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Category deleted successfully!!"
            )
        )
} catch (error) {
    throw new ApiError(
        500, 
        error?.message || "Category deletion failed");
    
}
})

const listCategories = asyncHandler(async (_, res) => {
    const allCategories = await Category.find({})

    if( !allCategories || allCategories.length === 0){ 
        throw new ApiError(
            404,
            "No Categories found"
        )
    }

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allCategories,
            "Successfully fetched all the categories!"
        )
    )
})

const readCategory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        throw new ApiError(
            400,
            "ID is required exist"
        )
    }

    const getCategory = await Category.findById(id).select('-createdAt -updatedAt')

    if (!getCategory) {
        throw new ApiError(
            404,
            "Category not found",
        )
    }
    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            getCategory,
            "Successfully retrieved the specified category"
        )
    )
})


export {
    createCategory,
    updateCategory,
    destroyCategory,
    listCategories,
    readCategory,
}