import { Schema, model } from "mongoose";
import type { ShopItem } from "astrea-shared/types/shop-item.type.ts";

const shopItemSchema = new Schema<ShopItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["border", "title", "avatar"],
      required: true,
    },
    price: { type: Number, required: true },
    imageUrl: { type: String, default: "" },
    color: { type: String, default: "" },
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },
    requiredLevel: { type: Number, default: 1 },
  },
  { timestamps: true },
);

export default model<ShopItem>("ShopItem", shopItemSchema);
