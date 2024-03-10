import express from "express";
import { 
  changeCurrentPassword,
  getAllUsers,
  getCurrentUser,
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  registerUser, 
  updateAccountDetails
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router()

router
  .route('/register')
  .post(registerUser);

router
  .route('/login')
  .post(loginUser);

//Note: Secure Routes

router
  .route('/logout')
  .post(verifyJWT, logoutUser);

router
  .route('/refresh-token')
  .post(refreshAccessToken)

router
  .route('/profile')
  .get(verifyJWT,getCurrentUser)
  .patch(verifyJWT, updateAccountDetails)

router
  .route('/profile/change-password')
  .patch(verifyJWT, changeCurrentPassword)

router
  .route('/get-all-users')
  .get(verifyJWT, getAllUsers)

export default router;

