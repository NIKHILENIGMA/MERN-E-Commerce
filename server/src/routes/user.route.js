import express from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser 
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router()

router
  .route('/')
  .post(registerUser)

router
  .route('/login')
  .post(loginUser)

//Note: Secure Routes

router
  .route('/logout')
  .post(verifyJWT, logoutUser)

export default router;