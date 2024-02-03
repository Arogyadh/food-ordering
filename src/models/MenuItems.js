import mongoose, { Schema, model, models } from "mongoose";
const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});
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
    category: {
      type: mongoose.Types.ObjectId,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    sizes: { type: [ExtraPriceSchema] },
    extraIngridientPrices: { type: [ExtraPriceSchema] },
  },

  { timestamps: true }
);

export const MenuItems =
  models?.MenuItems || model("MenuItems", MenuItemsSchema);
