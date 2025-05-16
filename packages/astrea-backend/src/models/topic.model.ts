import {Schema, model, Types} from 'mongoose';

const topicSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    color: {type: String, required: true},
    icon: {type: String, required: true},
}, {timestamps: true});

export const Topic = model('Topic', topicSchema);
