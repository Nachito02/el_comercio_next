// models/Category.ts
import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)
export default Category
