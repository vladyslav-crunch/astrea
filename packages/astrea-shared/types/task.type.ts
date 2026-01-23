export type TaskStatus = 'upcoming' | 'in_progress' | 'done';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export type TaskBase = {
    topicId: string;
    goalId: string;
    title: string;
    description?: string;
    difficulty: TaskDifficulty;
    status: TaskStatus;
    order: number;
    dueDate?: string;
    microtasks: string[];
};

export type Task = TaskBase & {
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};
