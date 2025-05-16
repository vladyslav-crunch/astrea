import {Topic} from '../models/topic.model';
import type {UpdateTopicInput} from 'astrea-shared'

export const createTopic = async (userId: string, title: string, color: string, icon: string) => {
    return await Topic.create({userId, title, color, icon});
};

export const getUserTopics = async (userId: string) => {
    return Topic.find({userId});
};

export const getTopicById = async (userId: string, topicId: string) => {
    return Topic.findOne({_id: topicId, userId});
};

export const updateTopic = async (userId: string, topicId: string, updates: UpdateTopicInput) => {
    return Topic.findOneAndUpdate({_id: topicId, userId}, updates, {new: true});
};

export const deleteTopic = async (userId: string, topicId: string) => {
    return Topic.findOneAndDelete({_id: topicId, userId});
};
