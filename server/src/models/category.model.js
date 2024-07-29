import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            maxLength: 20,
            required: true,
            unique: true,

        },
        status: {
            type: Boolean,  
        }

     }, 
    { 
        timestamps: true
    });


export const Category = mongoose.model('Category', categorySchema)