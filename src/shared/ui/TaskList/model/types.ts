export interface Task
{
    title: string;
    description?: string;
    status?: TaskStatus
    dueDate?: Date;
    priority?: TaskPriority
    tags?: string[];
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
