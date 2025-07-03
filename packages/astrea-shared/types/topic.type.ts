export type TopicBase = {
    title: string;
    description?: string;
    color?: string;
    icon?: string;
};

export type Topic = TopicBase & {
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

export type TopicWithStats = Topic & {
    taskCount: number;
    upcoming: number;
    in_progress: number;
    done: number;
    dueToday: number;
};
