import express from "express";
import { Order } from "../models/order";
import { checkIdempotency } from "../middlewares/check-idempotent-key";
import { ResponseOrder } from "../models/response";

const router = express.Router();

router.get("/order", async (req, res) => {
  // sends back order - idempotent by default
  const orders = await Order.find();

  res.json(orders);
});

router.post("/order", checkIdempotency, async (req, res) => {
  // creates an order - not idempotent
  const { price, title } = req.body;
  if (!req.body?.idempotencyKey) {
    return res.sendStatus(400);
  }
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const order = new Order({
      price,
      title,
    });
    await order.save({
      session,
    });

    // throw new Error("testing ttrancation");

    const response = new ResponseOrder({
      idempotencyKey: req.body.idempotencyKey,
      price,
      title,
      statusCode: 201,
    });
    await response.save({
      session,
    });
    await session.commitTransaction();

    res.status(201).json({ title: order.title, price: order.price });

    session.endSession();
  } catch (err) {
      console.error(err)
    await session.abortTransaction();
    session.endSession();
    res.sendStatus(500);
  }
});

export { router as orderRouter };
