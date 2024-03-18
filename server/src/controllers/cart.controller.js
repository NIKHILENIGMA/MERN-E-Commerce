import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const addItemToCart = asyncHandler( async (req, res) => { 
    const { items } = req.body

    if (!items || items.length === 0) {
        throw new ApiError(
            404,
            "No items provided"
        )
    }

    try {

        let cartItemsExist = await Cart.find({customerId: req.customer._id})

        if (!cartItemsExist) {
            throw new ApiError(
                404,
                "User does not have items inside the cart"
            )
        }

        const cartItems = await Cart.create({
            customerId: req.customer._id,
            productReference: items.map(item => ({ 
                productId: item.itemId,
                quantity: item.quantity,
                price: item.price,
            }))
        })

        if (!cartItems) {
            throw new ApiError(
                500,
                "cart items failed to add"
            )
        }

        res
        .status(200)
        .json(
            new ApiResponse(
                201,
                cartItems,
                "Product added to cart successfully"
            )
        )

        
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500, 
            `Error occurred while creating shipment :: Due to :: ${errorMessage}`
            || "addItemToCart failed"
        )
    }
})


export const updateCartItem = asyncHandler( async ( req, res ) => { 
    const { items } = req.body
    const cartId = req.params.id
    // console.log(customerId.toString());
    
    try {
        const cart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $set: {
                    productReference: items.map(item => ({
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                    }))
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        console.log(cart);
        if (!cart) {
            throw new ApiError(
                404,
                "Cart not found"
            );
        }


        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                cart,
                "Cart updated successfully"    
            )
        )


    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500, 
            `Error occurred while updating cart :: Due to :: ${errorMessage}`
            || "addItemToCart failed"
        )
    }
})


export const deleteCartItem = asyncHandler( async ( req, res ) => { 
    const { cartId, itemId } = req.params;
    console.log("cartId", cartId,"::", "itemId", itemId);
    if (!cartId) {
        throw new ApiError(
            404, 
            "Cart not found" 
        );
    }

    if (!itemId ) {
        throw new ApiError(
            404,
            "Cart item not found"
        )
    }

    try {
        
        const removeCartItem = await Cart.findByIdAndUpdate(
            cartId,
            {
                $pull: {
                    productReference: {_id: itemId}
                }
            },
            {
                new: true,
            }
        )

        if (!removeCartItem) {
            throw new ApiError(
                400,
                "No items found inside the cart"
            )
        }

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                removeCartItem,
                "Item remove from the cart successfully"
            )
        )
    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            `Error occurred while deleting cart item :: reason :: ${errorMessage}` 
            || "Error occurred while deleting cart item"
        )
    }


})


export const getCartItems = asyncHandler( async ( req, res ) => { 
    const customerId = req.customer._id

    if (!customerId) {
        throw new ApiError(
            400,
            "Please get authenticate"
        )
    }

    try {
        
        const cartItems = await Cart.aggregate([
            {
                $match: {
                    customerId: customerId
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productReference.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails",
            },
            {
                $unwind: "$productReference"
            },
            {
                $project: {
                    "productReference.productId": 1,
                    "productReference.price": 1,
                    "productReference.quantity": 1,
                    "productDetails.title": 1,
                    "productDetails.brand": 1,
                    "productDetails.image": 1,

                    },

            }
        ])

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                cartItems,
                "Successfully fetched all products inside the cart"
            )
        )



    } catch (error) {
        const errorMessage = error.message
        throw new ApiError(
            500,
            `Error occurred while fetch cart items :: reason :: ${errorMessage}`
            || "Error message while getting the product inside the cart"
        )
    }
})