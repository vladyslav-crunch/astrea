import { Topic } from "../models/topic.model";
import { Goal } from "../models/goal.model";
import Task from "../models/task.model";
import type { UpdateTopicInput } from "astrea-shared";
import { Types } from "mongoose";

export const createTopic = async (
  userId: string,
  title: string,
  color: string,
  icon: string,
) => {
  return await Topic.create({ userId, title, color, icon });
};

export const getUserTopics = async (userId: string) => {
  return Topic.find({ userId });
};

export const getTopicById = async (userId: string, topicId: string) => {
  return Topic.findOne({ _id: topicId, userId });
};

export const updateTopic = async (
  userId: string,
  topicId: string,
  updates: UpdateTopicInput,
) => {
  return Topic.findOneAndUpdate({ _id: topicId, userId }, updates, {
    new: true,
  });
};

export const deleteTopic = async (userId: string, topicId: string) => {
  await Task.deleteMany({ topicId: topicId, userId });
  await Goal.deleteMany({ topicId: topicId, userId });
  return Topic.findOneAndDelete({ _id: topicId, userId });
};

export const getUserTopicsWithTaskCount = async (userId: string) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  return Topic.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "topicId",
        as: "tasks",
      },
    },
    {
      $project: {
        title: 1,
        color: 1,
        icon: 1,
        taskCount: { $size: "$tasks" },
        upcoming: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: { $eq: ["$$task.status", "upcoming"] },
            },
          },
        },
        in_progress: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: { $eq: ["$$task.status", "in_progress"] },
            },
          },
        },
        done: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: { $eq: ["$$task.status", "done"] },
            },
          },
        },
        dueToday: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: {
                $and: [
                  { $ifNull: ["$$task.dueDate", false] },
                  { $lt: ["$$task.dueDate", startOfTomorrow] },
                  { $ne: ["$$task.status", "done"] },
                ],
              },
            },
          },
        },
      },
    },
  ]);
};
