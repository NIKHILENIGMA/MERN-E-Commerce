import express from 'express';
import {
    createReview,
    updateReview,
    deleteReview,
    getReviews
} from "../controllers/review.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';


//? https://localhost:5000/api/v1/reviews/:productId/:reviewId
const router = express.Router();

/// Get all the reviews for the product
router
    .route("/:productId")
    .get(getReviews)

/// Create a new review
router
    .route("/:productId/")
    .post(verifyJWT , createReview)

/// Update or delete a review
router
    .route("/:productId/:reviewId")
    .patch(verifyJWT , updateReview)
    .delete(verifyJWT, deleteReview)

export default router