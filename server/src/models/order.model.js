import mongoose, { Schema } from 'mongoose';

const orderItemSchema = new Schema(
    {
        product:{
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },

        price:{
            type: Number,
            required: true,
        },

        quantity:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const orderSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        
        orderItems: [orderItemSchema],

        paymentMethods: {
            type: String,
            required: true,
        },

        paymentResult: {
            type: mongoose.Types.ObjectId,
            ref: "PaymentResult",
            required: true,

        },

        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },

        totalPrice: {
            type: true,
            required: true,
        },

        isPaid: {
            type: Boolean,
            required: true,
        },

        paidAt: {
            type: Date,
        },

        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },

        deliveredAt: {
            type: Date,
        }

   },
    {
        timestamps: true,
    }
)

export const Order = mongoose.model("Order", orderSchema)