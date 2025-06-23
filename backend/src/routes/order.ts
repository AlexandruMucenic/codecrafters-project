import { Router, Request, Response } from "express";
import Order from "../models/order";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error: any) {
    res.status(500).send({ error: "Failed to fetch orders." });
  }
});

router.post("/", async (req: any, res: any) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .send({ error: "Items must be a non-empty array." });
    }

    const productsNumber = items.reduce(
      (total: number, item: any) => total + (item.quantity || 1),
      0
    );

    const id = Date.now();

    const newOrder = new Order({
      _id: id,
      id,
      items,
      productsNumber,
    });

    await newOrder.save();
    res.send(newOrder);
  } catch (error: any) {
    res.status(500).send({ error: "Failed to create order." });
  }
});

router.put(
  "/:id/increaseQuantity",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const product = await Order.findOne({ id: req.params.id });

      await product?.updateOne({ $inc: { quantity: 1 } });

      const updatedProducts = await Order.find();
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
      const product = await Order.findOne({ id: req.params.id });

      await product?.updateOne({ $inc: { quantity: -1 } });

      const updatedProducts = await Order.find();
      res.send(updatedProducts);
    } catch (error: any) {
      res.status(404).send({ error: "Product doesn't exist!" });
    }
  }
);

router.delete(
  "/:id/delete",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      await Order.deleteOne({ id: req.params.id });

      const order = await Order.find();
      res.send(order);
    } catch (error: any) {
      res.status(500).send({ error: "Failed to delete order." });
    }
  }
);

router.delete("/all", async (_req: Request, res: Response) => {
  try {
    await Order.deleteMany({});
    res.send({ message: "All orders have been deleted." });
  } catch (error: any) {
    console.error("Error deleting all orders:", error);
    res.status(500).send({ error: "Failed to delete." });
  }
});

export default router;
