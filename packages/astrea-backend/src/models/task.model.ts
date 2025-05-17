// models/task.model.ts
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    topicId: {type: mongoose.Types.ObjectId, required: true, ref: 'Topic'},
    goalId: {type: mongoose.Types.ObjectId, ref: 'Goal'},
    title: {type: String, required: true},
    description: {type: String},
    difficulty: {type: String, enum: ['easy', 'medium', 'hard'], required: true},
    dueDate: {type: Date},
    microtasks: [String],
}, {timestamps: true});

export default mongoose.model('Task', taskSchema);
