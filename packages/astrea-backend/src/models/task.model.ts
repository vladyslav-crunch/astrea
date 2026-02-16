import mongoose from "mongoose";
import { microtaskSchema } from "./microtask.model.ts";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    topicId: { type: mongoose.Types.ObjectId, required: true, ref: "Topic" },
    goalId: { type: mongoose.Types.ObjectId, ref: "Goal" },

    title: { type: String, required: true },
    description: { type: String },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "in_progress", "done"],
      default: "upcoming",
      required: true,
    },

    order: { type: Number, default: 0 },

    dueDate: { type: Date },

    completedAt: { type: Date },

    microtasks: {
      type: [microtaskSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Task", taskSchema);
