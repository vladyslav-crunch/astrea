export type GoalBase = {
    topicId: string;
    title: string;
    description?: string;
    modifier?: {
        easy?: number;
        medium?: number;
        hard?: number;
    };
}

export type Goal = GoalBase & {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type GoalWithStats = Goal & {
    taskCount: number;
    upcoming: number;
    in_progress: number;
    done: number;
    dueToday: number;
};