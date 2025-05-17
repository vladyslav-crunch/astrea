import {Goal} from '../models/goal.model';

export const createGoal = (userId: string, topicId: string, data: any) =>
    Goal.create({userId, topicId, ...data});

export const getUserGoals = (userId: string) =>
    Goal.find({userId});

export const getGoalsByTopic = (userId: string, topicId: string) =>
    Goal.find({userId, topicId});

export const updateGoal = (userId: string, goalId: string, updates: any) =>
    Goal.findOneAndUpdate({_id: goalId, userId}, updates, {new: true});

export const deleteGoal = (userId: string, goalId: string) =>
    Goal.findOneAndDelete({_id: goalId, userId});

export const getGoalById = (userId: string, goalId: string) => {
    return Goal.findOne({_id: goalId, userId});
}