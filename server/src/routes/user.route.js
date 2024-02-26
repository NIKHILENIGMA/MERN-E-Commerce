import express from "express";
import { 
  getAllUsers,
  getCurrentUser,
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  registerUser 
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
  .route('/current-user')
  .get(verifyJWT,getCurrentUser)

router
  .route('/get-all-users')
  .get(verifyJWT, getAllUsers)

export default router;