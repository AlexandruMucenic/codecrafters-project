import mongoose, { Document, Schema } from "mongoose";
import { ICartProduct } from "./cartProduct";

interface IOrder extends Document {
  _id: number;
  id: number;
  items: ICartProduct[];
  productsNumber: number;
}

const orderSchema = new Schema<IOrder>(
  {
    _id: { type: Number, required: true },
    id: { type: Number, required: true },
    items: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    productsNumber: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
