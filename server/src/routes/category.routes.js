// Import Packages
import express from "express";

// Import Controllers
import {
  createCategory,
  updateCategory,
  destroyCategory,
  listAllCategories,
  readCategory,
} from "../controllers/category.controller.js";

// Import Middlewares
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { isValidId } from "../middlewares/isValidId.js";
const router = express.Router();

//TODO Include verifyJWT and isAdmin both middleware 
/// Add Category route
router.route("/add").post(createCategory);

//TODO Include verifyJWT and isAdmin both middleware
/// Update and delete Category route
router
  .route("/:id")
  .patch(isValidId("category"),updateCategory)
  .delete(isValidId("category"),destroyCategory);

/// Get all Categories route
//TODO Include verifyJWT and isAdmin both middleware
router
  .route("/")
  .get(listAllCategories);

/// Get a particular Category route
// TODO Include verifyJWT and isAdmin both middleware
router
  .route("/:id")
  .get(isValidId("category"), readCategory);

export default router;
