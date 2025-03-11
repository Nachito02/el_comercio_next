// models/Brand.ts
import mongoose, { Schema, model, models } from 'mongoose';

const BrandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  logoUrl: { type: String },
});

const Brand = models.Brand || model('Brand', BrandSchema);

export default Brand;
