import type {Response} from 'express';
import {createTopicSchema, updateTopicSchema} from 'astrea-shared'
import * as TopicService from '../services/topic.service';
import type {AuthRequest} from '../middleware/isAuthenticated';


export const createTopic = async (req: AuthRequest, res: Response) => {
    const parsed = createTopicSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({message: 'Invalid input', errors: parsed.error.flatten()});
        return
    }

    try {
        const topic = await TopicService.create(req.user!.id, parsed.data.title, parsed.data.color, parsed.data.icon);
        res.status(201).json({message: 'Topic created', topic});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getTopics = async (req: AuthRequest, res: Response) => {
    try {
        const topics = await TopicService.getAll(req.user!.id);
        res.status(200).json({topics});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};


export const getTopic = async (req: AuthRequest, res: Response) => {
    const topicId = req.params.id;
    if (!topicId) {
        res.status(400).json({message: 'Missing topic ID in request URL'});
        return
    }
    try {
        const topic = await TopicService.getById(req.user!.id, topicId);
        if (!topic) {
            res.status(404).json({message: 'Topic not found'});
            return
        }
        res.json(topic);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const updateTopic = async (req: AuthRequest, res: Response) => {
    const parsed = updateTopicSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({message: 'Invalid input', errors: parsed.error.flatten()});
        return
    }
    const topicId = req.params.id;
    if (!topicId) {
        res.status(400).json({message: 'Missing topic ID in request URL'});
        return
    }

    try {
        const updated = await TopicService.update(req.user!.id, topicId, parsed.data);
        if (!updated) {
            res.status(404).json({message: 'Topic not found'})
            return
        }

        res.json({message: 'Topic updated', topic: updated});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const deleteTopic = async (req: AuthRequest, res: Response) => {
    const topicId = req.params.id;
    if (!topicId) {
        res.status(400).json({message: 'Missing topic ID in request URL'});
        return
    }
    try {
        const deleted = await TopicService.remove(req.user!.id, topicId);
        if (!deleted) {
            res.status(404).json({message: 'Topic not found'});
            return
        }
        res.json({message: 'Topic deleted'});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export const getTopicsWithTaskCount = async (req: AuthRequest, res: Response) => {
    try {
        const topics = await TopicService.getAllWithTaskCount(req.user!.id);
        res.status(200).json({topics});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};


