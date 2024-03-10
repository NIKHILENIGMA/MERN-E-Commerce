import mongoose, { Schema } from 'mongoose';

const paymentResultSchema = new Schema(
    {

        status: {
            type: Boolean,
            required: true,
        },
        update_time: {
            type: Number,
            required: true,
        },
        email_address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const PaymentResult = mongoose.model('PaymentResult', paymentResultSchema)

