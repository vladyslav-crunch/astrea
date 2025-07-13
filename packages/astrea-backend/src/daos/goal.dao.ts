import {Goal} from '../models/goal.model';
import {Types} from "mongoose";

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

export const getGoalsWithStats = async (userId: string, topicId: string) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfTomorrow = new Date();
    startOfTomorrow.setHours(24, 0, 0, 0);

    return Goal.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(userId),
                topicId: new Types.ObjectId(topicId),
            }
        },
        {
            $lookup: {
                from: 'tasks',
                localField: '_id',
                foreignField: 'goalId',
                as: 'tasks'
            }
        },
        {$sort: {order: 1}},
        {
            $project: {
                title: 1,
                description: 1,
                modifier: 1,
                topicId: 1,
                createdAt: 1,
                updatedAt: 1,
                taskCount: {$size: '$tasks'},
                upcoming: {
                    $size: {
                        $filter: {
                            input: '$tasks',
                            as: 'task',
                            cond: {$eq: ['$$task.status', 'upcoming']}
                        }
                    }
                },
                in_progress: {
                    $size: {
                        $filter: {
                            input: '$tasks',
                            as: 'task',
                            cond: {$eq: ['$$task.status', 'in_progress']}
                        }
                    }
                },
                done: {
                    $size: {
                        $filter: {
                            input: '$tasks',
                            as: 'task',
                            cond: {$eq: ['$$task.status', 'done']}
                        }
                    }
                },
                dueToday: {
                    $size: {
                        $filter: {
                            input: '$tasks',
                            as: 'task',
                            cond: {
                                $and: [
                                    {$lt: ['$$task.dueDate', startOfTomorrow]},
                                    {$ne: ['$$task.status', 'done']}
                                ]
                            }
                        }
                    }
                }
            }
        }
    ]);
};

export const reorderGoals = async (
    userId: string,
    updates: { _id: string; order: number }[]
) => {
    const bulkOps = updates.map(({_id, order}) => ({
        updateOne: {
            filter: {_id, userId},
            update: {$set: {order}},
        }
    }));

    return Goal.bulkWrite(bulkOps);
};

export const incrementOrders = async (userId: string, topicId: string) => {
    await Goal.updateMany(
        {userId, topicId},
        {$inc: {order: 1}}
    );
};