import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
