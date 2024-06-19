import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    sizes: [{
        name: { type: String },
        quantity: { type: Number },
    }],
    imageUrl: [{
        data: Buffer, 
        contentType: String, 
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratings',
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews',
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    gender: {
        type: String,
        enum: ['All','Men', 'Women', 'Unisex', 'Kids / boy','Kids / girl'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model('Product', productSchema);

export { Product };
