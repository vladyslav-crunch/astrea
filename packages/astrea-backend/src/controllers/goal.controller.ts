import type {Response} from 'express';
import * as GoalService from '../services/goal.service';
import type {AuthRequest} from '../middleware/isAuthenticated';
import {createGoalSchema, updateGoalSchema} from 'astrea-shared';


export const createGoal = async (req: AuthRequest, res: Response) => {
    const parsed = createGoalSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({message: 'Invalid input', errors: parsed.error.flatten()});
        return
    }

    try {
        const goal = await GoalService.create(req.user!.id, parsed.data.topicId, parsed.data);
        res.status(201).json({message: 'Goal created', goal});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getGoals = async (req: AuthRequest, res: Response) => {
    try {
        const goals = await GoalService.getAll(req.user!.id);
        res.json({goals});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getGoal = async (req: AuthRequest, res: Response) => {
    const goalId = req.params.id;
    if (!goalId) {
        res.status(400).json({message: 'Missing goal ID in request URL'});
        return
    }
    try {
        const goal = await GoalService.getById(req.user!.id, goalId);
        if (!goal) {
            res.status(404).json({message: 'Goal not found'});
            return
        }
        res.json(goal);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const updateGoal = async (req: AuthRequest, res: Response) => {
    const parsed = updateGoalSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({message: 'Invalid input', errors: parsed.error.flatten()});
        return
    }

    const goalId = req.params.id;
    if (!goalId) {
        res.status(400).json({message: 'Missing Goal ID in request URL'});
        return
    }
    try {
        const updated = await GoalService.update(req.user!.id, goalId, parsed.data);
        if (!updated) {
            res.status(404).json({message: 'Goal not found'})
            return
        }
        res.json({message: 'Goal updated', goal: updated});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const deleteGoal = async (req: AuthRequest, res: Response) => {
    const goalId = req.params.id;
    if (!goalId) {
        res.status(400).json({message: 'Missing Goal ID in request URL'});
        return
    }
    try {
        const deleted = await GoalService.remove(req.user!.id, goalId);
        if (!deleted) {
            res.status(404).json({message: 'Goal not found'})
            return
        }
        res.json({message: 'Goal deleted'});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getGoalsByTopic = async (req: AuthRequest, res: Response) => {
    const topicId = req.params.topicId;
    if (!topicId) {
        res.status(400).json({message: 'Missing topic ID in request URL'});
        return
    }

    try {
        const goals = await GoalService.getByTopic(req.user!.id, topicId);
        res.status(200).json({goals});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};