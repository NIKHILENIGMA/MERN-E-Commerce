import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { 
    addItemToCart,
    getCartItems,
    updateCartItem,
    deleteCartItem 
} from '../controllers/cart.controller.js';

const router = express.Router();

router
    .route('/')
    .post(verifyJWT, addItemToCart)
    
router
    .route("/:id")
    .patch(verifyJWT, updateCartItem)


router
    .route("/:cartId/item/:itemId")
    .delete(verifyJWT, deleteCartItem)
    
router
    .route('/cart-items')
    .get(verifyJWT, getCartItems)

export default router;