import { Schema, model, models } from "mongoose";

const MenuItemsSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    basePrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const MenuItems =
  models?.MenuItems || model("MenuItems", MenuItemsSchema);
