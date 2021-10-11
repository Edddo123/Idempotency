import mongoose from "mongoose";

interface OrderDoc {
  price: number;
  title: string;
}

const orderSchema = new mongoose.Schema<OrderDoc>({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model<OrderDoc>("order", orderSchema);

export { Order };
