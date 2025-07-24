import {Schema, model, Types} from 'mongoose';
import {Goal} from './goal.model'; // Adjust path as needed

const topicSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    color: {type: String, required: true},
    icon: {type: String, required: true},
}, {timestamps: true});

// After saving a new Topic, create a default "drafts" Goal
topicSchema.post('save', async function (doc) {
    try {
        await Goal.create({
            userId: doc.userId,
            topicId: doc._id,
            title: 'Drafts',
            description: 'Use this area to create tasks that aren\'t associated with any goal.',
            isDefault: true,
            order: 0, // Optional: could place default first
        });
    } catch (err) {
        console.error('Failed to create default goal for new topic:', err);
    }
});

export const Topic = model('Topic', topicSchema);
