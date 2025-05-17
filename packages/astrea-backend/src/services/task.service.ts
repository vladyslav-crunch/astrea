// services/task.service.ts
import * as TaskDAO from '../daos/task.dao';
import type {z} from 'zod';
import {createTaskSchema} from 'astrea-shared';

type TaskInput = z.infer<typeof createTaskSchema>;

export const create = async (userId: string, data: TaskInput) => {
    return TaskDAO.createTask({...data, userId});
};

export const getAll = (userId: string) => TaskDAO.getUserTasks(userId);

export const getByTopic = (userId: string, topicId: string) =>
    TaskDAO.getTasksByTopic(userId, topicId);

export const getByGoal = (userId: string, goalId: string) =>
    TaskDAO.getTasksByGoal(userId, goalId);

export const getById = (userId: string, id: string) =>
    TaskDAO.getTaskById(userId, id);

export const update = (userId: string, id: string, updates: Partial<TaskInput>) =>
    TaskDAO.updateTask(userId, id, updates);

export const remove = (userId: string, id: string) =>
    TaskDAO.deleteTask(userId, id);
