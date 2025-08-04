export type Task =
{
    id: number;
    title: string;
    description?: string;
    status?: TaskStatus
    dueDate?: string;
    creationDate?: string,
    updatedDate?: string
    priority?: TaskPriority
    tags?: string[];
}

export type TaskStatus = "todo" | "in-progress" | "done" | "unset";

export type TaskPriority = "low" | "medium" | "high" | "unset";