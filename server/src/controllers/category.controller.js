import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/// Create Category Controller
export const createCategory = asyncHandler(async (req, res) => {
  // Extracting the name and status from req body
  const { name, status } = req.body;

  try {
    // Check if category name is provided or not
    if (!name) {
      throw new ApiError(401, "Category name is required!!");
    }

    // Check if category is already created or not
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw new ApiError(
        409,
        `The category by name of ${existingCategory.name} already exist please try again with different category name.`
      );
    }

    const category = await Category.create({
      name,
      status,
    });

    console.log(
      `At 32, In category controller, created category details: ${category}`
    );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          category,
          `The category with name of ${category.name} has been created successfully`
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Category not created");
  }
});

/// Update category controller
export const updateCategory = asyncHandler(async (req, res) => {
  // Extrating name and status from req body and ID of the category from req parameter
  const { name, status } = req.body;
  const { id: categoryID } = req.params;

  try {
    if (!(name || status)) {
      throw new ApiError(
        404,
        "Name of the category or status of category do not exist. Please try again later."
      );
    }

    // Find the category by its ID and then update the category details
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryID,
      {
        $set: {
          name,
          status,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      throw new ApiError(
        404,
        "The category you are trying to update does not exist."
      );
    }

    res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            updatedCategory, 
            "Category details updated successfully"
        ));

  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "There was an error while updating the category. Please try again later"
    );
  }
});

/// Delete category controller
export const destroyCategory = asyncHandler(async (req, res) => {
  // Extracting the id from the URL
  const { id } = req.params;

  // If ID does not get from the params then throw new Error
  if (!id) {
    throw new ApiError(
      400,
      "The ID which you are access might be deleted or do not exist"
    );
  }

  try {
    // Find the category by ID and then destroy it from database
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw new ApiError(
        404,
        "The category you are trying to remove does not exist or already remove"
      );
    }
    console.log(`At line 131, In delete category: ${deletedCategory}`);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          `The ${deletedCategory.name} category has been removed successfully`
        )
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Category deletion failed");
  }
});

/// Get all the categories controller
export const listAllCategories = asyncHandler(async (_, res) => {
  const allCategories = await Category.find({}).select("-updatedAt");

  if (!allCategories || allCategories.length === 0) {
    throw new ApiError(
        404, 
        "Something went wrong while retriving the all the category"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allCategories,
        "Successfully fetched all the categories!"
      )
    );
});

/// Get a category controller
export const readCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(
        400, 
        "ID is required exist"
    );
  }

  const getCategory = await Category.findById(id).select(
    "-updatedAt"
  );

  if (!getCategory) {
    throw new ApiError(404, "Category not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        getCategory,
        "Successfully retrieved the specified category"
      )
    );
});
