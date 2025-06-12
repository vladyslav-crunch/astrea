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
