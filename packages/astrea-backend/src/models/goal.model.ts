import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
        topicId: {type: mongoose.Types.ObjectId, ref: 'Topic', required: true},
        title: {type: String, required: true},
        description: {type: String},
        modifier: {
            easy: {type: Number, default: 1},
            medium: {type: Number, default: 1},
            hard: {type: Number, default: 1},
        },
        order: {type: Number},
    },
    {timestamps: true}
);

export const Goal = mongoose.model('Goal', goalSchema);