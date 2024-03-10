import mongoose, { Schema } from 'mongoose'; 

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative'],
            default: 0,
            
        },
        brand: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },
        quantity: {
            type: Number,
            min: [0, 'Quantity cannot be negative of -1'],
            required: true,
            default: 0,

        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            required: true,
        }, 

        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
            }
        ],

        reviewCount: {
            type: Number,
            required: true,
        },

        countInStock: {
            type: Number,
            default: 0,
        }

    },
    {
        timestamps: true,
    });


export const Product = mongoose.model('Product', productSchema)