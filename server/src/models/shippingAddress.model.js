import mongoose, { Schema } from "mongoose";

const shippingAddressSchema = new Schema(
    {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true, 
        },
        country: {
            type: String,
            required: true,
        }
    },
    {
        timeStamps: true
    }
);

export const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema)