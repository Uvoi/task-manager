export type Task = {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    creationDate: string;
    dueDate: string;
    updatedDate: string;
    priority: TaskPriority;
    tags?: string[];
}

export type TaskStatus = "todo" | "in_progress" | "done" | "unset";

export type TaskPriority = "low" | "medium" | "high" | "unset";

export interface TaskFilter {
    status?: TaskStatus;
    priority?: TaskPriority;
    creatorId?: number;
    tagIds?: number[];
}

export interface TaskCreateInput {
    title: string;
    description?: string;
    dueDate: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    creatorId: number;
    parentTaskId?: number;
    tagIds?: number[];
}

export type TaskUpdateClient = Omit<Task, 'tags'> & { tags: number[] };
