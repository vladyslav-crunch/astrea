import { Schema, model } from "mongoose";
import type { CustomReward } from "astrea-shared";

const customRewardSchema = new Schema<CustomReward>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    coins: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export default model<CustomReward>("CustomReward", customRewardSchema);
