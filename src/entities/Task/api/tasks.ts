import { apiInstance } from "@/shared/api/apiInstance";
import { Task, TaskCreateInput, TaskFilter, TaskUpdateClient } from "../model/types";

export const getTasks = (filters?: TaskFilter): Promise<Task[]> => {
    const query = new URLSearchParams();

    if (filters?.status) query.append('status', filters.status);
    if (filters?.priority) query.append('priority', filters.priority);
    if (filters?.creatorId) query.append('creatorId', filters.creatorId.toString());
    if (filters?.tagIds?.length) filters.tagIds.forEach(id => query.append('tagIds', id.toString()));

    const queryString = query.toString() ? `?${query.toString()}` : '';

    return apiInstance.get(`/tasks${queryString}`);
};

export const createTaskApi = (task: TaskCreateInput) =>
    apiInstance.post('/tasks', task);

export const patchTask = (task: Partial<TaskUpdateClient>) => {
    console.log(task)
    return apiInstance.patch(`/tasks/${task.id}`, task);
};
