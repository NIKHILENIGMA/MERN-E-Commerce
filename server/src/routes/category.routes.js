import express from 'express'; 

import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
  createCategory, 
  updateCategory,
  destroyCategory,
  listCategories,  
  readCategory,
  
} from '../controllers/category.controller.js';
import { isAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

router
  .route('/')
  .post(verifyJWT, isAdmin , createCategory)

router
  .route('/:id')
  .patch(verifyJWT, isAdmin, updateCategory)
  .delete(verifyJWT, isAdmin, destroyCategory)

router
  .route('/categories')
  .get(listCategories)

  router
  .route('/categories/:id')
  .get(readCategory)



export default router;
