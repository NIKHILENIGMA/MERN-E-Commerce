import mongoose, { Schema } from "mongoose";

const shipmentSchema = new Schema(
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
        },

        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

    },
    {
        timeStamps: true
    }
);

export const Shipment = mongoose.model("Shipment", shipmentSchema)