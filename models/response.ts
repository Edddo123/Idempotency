import mongoose from "mongoose";

interface CachedResponse {
    statusCode: number;
    price: number;
    title: string;
    idempotencyKey: string;
  }

const responseSchema = new mongoose.Schema<CachedResponse>({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  idempotencyKey: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    required: true,
  },
});

const ResponseOrder = mongoose.model<CachedResponse>("response", responseSchema);

export { ResponseOrder };
