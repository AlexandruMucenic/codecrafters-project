import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cart from "./routes/cart";
import products from "./routes/products";
import users from "./routes/users";
import order from "./routes/order";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", products);
app.use("/cart", cart);
app.use("/users", users);
app.use("/order", order);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the project API...");
});

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri!)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error: any) =>
    console.error("MongoDB connection failed:", error.message)
  );
