import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    topicId: { type: mongoose.Types.ObjectId, ref: "Topic", required: true },
    title: { type: String, required: true },
    description: {
      type: String,
      default: "This is a default description. Click the ⋮ to edit it.",
    },
    modifier: {
      easy: { type: Number, default: 1 },
      medium: { type: Number, default: 1 },
      hard: { type: Number, default: 1 },
      epic: { type: Number, default: 1 },
    },
    order: { type: Number },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Goal = mongoose.model("Goal", goalSchema);
