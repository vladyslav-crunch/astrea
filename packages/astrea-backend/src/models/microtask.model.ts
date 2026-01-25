import mongoose from "mongoose";

export const microtaskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        order: { type: Number, required: true },
    },
    { _id: true }
);

