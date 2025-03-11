// models/Product.ts
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    sizes: { type: [String], default: [] }, 
    colors: { type: [String], default: [] }, 
    stock: { type: Number, required: true },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
