import mongoose, {Schema} from 'mongoose';


const cartItemsSchema = new Schema({
    quantity: {
        type: Number,
        min: 1,
        default: 1,
        required: true,
    },

    price: {
        type: Number,
        min: 1,
        required: true,
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    }
})

const cartSchema = new Schema({

    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },

    productReference: [ cartItemsSchema ],

    },
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model('Cart', cartSchema);