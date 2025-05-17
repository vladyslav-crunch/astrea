import Task from '../models/task.model';

export const createTask = (data: any) => Task.create(data);

export const getUserTasks = (userId: string) => Task.find({userId});

export const getTasksByTopic = (userId: string, topicId: string) =>
    Task.find({userId, topicId});

export const getTasksByGoal = (userId: string, goalId: string) =>
    Task.find({userId, goalId});

export const getTaskById = (userId: string, id: string) =>
    Task.findOne({_id: id, userId});

export const updateTask = (userId: string, id: string, updates: any) =>
    Task.findOneAndUpdate({_id: id, userId}, updates, {new: true});

export const deleteTask = (userId: string, id: string) =>
    Task.findOneAndDelete({_id: id, userId});
