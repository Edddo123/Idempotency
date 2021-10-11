import express from "express";
import mongoose from "mongoose";
import { orderRouter } from "./routes/new";

const app = express();

app.use(express.json());

app.use(orderRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    app.listen(5001, () => {
      console.log("listening on port 5001");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
