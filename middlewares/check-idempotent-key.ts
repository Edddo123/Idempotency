import { RequestHandler } from "express";
import { ResponseOrder } from "../models/response";

export const checkIdempotency: RequestHandler = async (req, res, next) => {
  if (req.headers?.["idempotency_key"]) {
    const idempotencyKey = req.headers["idempotency_key"].toString();
    const cachedResponse = await ResponseOrder.findOne({
      idempotencyKey,
    });
    if (cachedResponse) {
      console.log("from cache");
      return res
        .status(cachedResponse.statusCode)
        .json({ title: cachedResponse.title, price: cachedResponse.price });
    }
    req.body.idempotencyKey = idempotencyKey;
  }
  next();
};
