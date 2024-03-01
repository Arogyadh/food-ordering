import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: String,
    city: String,
    zip: String,
    country: String,
    cartProducts: Object,
    status: String,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
