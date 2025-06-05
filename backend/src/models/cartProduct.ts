import mongoose, { Document, Schema } from "mongoose";

interface ICartProduct extends Document {
  _id: number;
  id: number;
  name: string;
  price: number;
  imageURL: string;
  quantity: number;
}

const cartProductSchema = new Schema<ICartProduct>(
  {
    _id: { type: Number, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

const CartProduct = mongoose.model<ICartProduct>(
  "CartProduct",
  cartProductSchema
);

export default CartProduct;
