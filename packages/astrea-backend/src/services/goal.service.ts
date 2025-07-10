import * as GoalDAO from '../daos/goal.dao';
import type {CreateGoalInput, UpdateGoalInput} from 'astrea-shared'


export const create = async (userId: string, topicId: string, data: CreateGoalInput) => {
    return await GoalDAO.createGoal(userId, topicId, data)
}

export const getAll = async (userId: string) => {
    return GoalDAO.getUserGoals(userId);
}

export const getByTopic = async (userId: string, topicId: string) => {
    return GoalDAO.getGoalsByTopic(userId, topicId);
}

export const update = async (userId: string, goalId: string, updates: UpdateGoalInput) => {
    return GoalDAO.updateGoal(userId, goalId, updates);
}

export const remove = (userId: string, goalId: string) => {
    return GoalDAO.deleteGoal(userId, goalId);
}

export const getById = (userId: string, goalId: string) => {
    return GoalDAO.getGoalById(userId, goalId);
}

export const getByTopicWithStats = async (userId: string, topicId: string) => {
    return GoalDAO.getGoalsWithStats(userId, topicId);
}