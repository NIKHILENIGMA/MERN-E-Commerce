import express from 'express';
import { loginUser, logoutUser, refreshAccessToken  } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router
  .post('/login', loginUser);


router
  .route('/logout')
  .post(verifyJWT, logoutUser);

router
  .route('/refresh-token')
  .post(verifyJWT, refreshAccessToken)


export default router;