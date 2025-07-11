import { Router, Request, Response } from "express";
import CartProduct from "../models/cartProduct";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const cartProducts = await CartProduct.find();
    res.send(cartProducts);
  } catch (error: any) {
    res.status(500).send("Error: " + error.message);
  }
});

router.delete(
  "/:id/delete",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      await CartProduct.deleteOne({ id: req.params.id });

      const cartProducts = await CartProduct.find();
      res.send(cartProducts);
    } catch (error: any) {
      res.status(404).send({ error: "Product doesn't exist!" });
    }
  }
);

router.put("/:id/add", async (req: any, res: any) => {
  try {
    const { id, name, imageUrl, price, quantity } = req.body;
    const product = await CartProduct.findOne({ id: req.params.id });

    if (!product) {
      const cartProduct = new CartProduct({
        _id: id,
        id,
        name,
        price,
        imageUrl,
        quantity,
      });

      await cartProduct.save();
      return res.send(cartProduct);
    }

    await product.updateOne({ $inc: { quantity } });

    const cartProducts = await CartProduct.find();
    res.send(cartProducts);
  } catch (error: any) {
    res.status(404).send({ error: "Product doesn't exist!" });
  }
});

router.put(
  "/:id/increaseQuantity",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const product = await CartProduct.findOne({ id: req.params.id });

      await product?.updateOne({ $inc: { quantity: 1 } });

      const updatedProducts = await CartProduct.find();
      res.send(updatedProducts);
    } catch (error: any) {
      res.status(404).send({ error: "Product doesn't exist!" });
    }
  }
);

router.put(
  "/:id/decreaseQuantity",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const product = await CartProduct.findOne({ id: req.params.id });

      await product?.updateOne({ $inc: { quantity: -1 } });

      const updatedProducts = await CartProduct.find();
      res.send(updatedProducts);
    } catch (error: any) {
      res.status(404).send({ error: "Product doesn't exist!" });
    }
  }
);

router.delete("/all", async (_req: Request, res: Response) => {
  try {
    await CartProduct.deleteMany({});
    res.send({ message: "All orders have been deleted." });
  } catch (error: any) {
    console.error("Error deleting all orders:", error);
    res.status(500).send({ error: "Failed to delete." });
  }
});

export default router;
