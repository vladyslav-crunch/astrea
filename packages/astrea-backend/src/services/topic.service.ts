import * as TopicDAO from '../daos/topic.dao';
import type {UpdateTopicInput} from "astrea-shared";

export const create = async (userId: string, title: string, color: string, icon: string) => {
    return await TopicDAO.createTopic(userId, title, color, icon);
};

export const getAll = async (userId: string) => {
    return await TopicDAO.getUserTopics(userId);
};

export const getById = async (userId: string, topicId: string) => {
    return await TopicDAO.getTopicById(userId, topicId);
};

export const update = async (userId: string, topicId: string, updates: UpdateTopicInput) => {
    return await TopicDAO.updateTopic(userId, topicId, updates);
};

export const remove = async (userId: string, topicId: string) => {
    return await TopicDAO.deleteTopic(userId, topicId);
};
