import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            
        },
        rating: {
            type: Number,
            min: [0, 'Rating cannot be negative'],
            max: [5, 'Rating cannot exceed the 5'],
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Review = mongoose.model('Review', reviewSchema);

