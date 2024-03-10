import express from 'express'; 
import formitable from 'express-formidable';
import { 
    createProduct,
    getProduct,
    updateProduct,
    destroyProduct,
    allProducts, 
} from '../controllers/product.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';



const router = express.Router();


router
    .route('/')
    .get(verifyJWT, allProducts)
    .post(verifyJWT,formitable(), createProduct)

router
    .route('/:id')
    .get(verifyJWT, getProduct)
    .patch(verifyJWT,formitable(), updateProduct)
    .delete(verifyJWT, destroyProduct)





export default router;