import {UniqueIdentifier} from "@dnd-kit/core";

export type Id = UniqueIdentifier;

export type Column = {
    id: Id;
    title: string;
};

export const COLUMNS: Column[] = [
    { id: "upcoming", title: "To Do" },
    { id: "in_progress", title: "In Progress" },
    { id: "done", title: "Done" },
];