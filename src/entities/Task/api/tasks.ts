import { apiInstance } from "@/shared/api/apiInstance";
import { Task, TaskCreateInput, TaskFilter, TaskUpdateClient } from "../model/types";

export const getTasksApi = (filters?: TaskFilter): Promise<Task[]> => {
    const query = new URLSearchParams();

    if (filters?.status) query.append('status', filters.status);
    if (filters?.priority) query.append('priority', filters.priority);
    if (filters?.creatorId) query.append('creatorId', filters.creatorId.toString());
    if (filters?.tagIds?.length) filters.tagIds.forEach(id => query.append('tagIds', id.toString()));

    const queryString = query.toString() ? `?${query.toString()}` : '';

    return apiInstance.get<Task[]>(`/tasks${queryString}`);
};

export const createTaskApi = (task: TaskCreateInput): Promise<Task> =>
    apiInstance.post<Task>('/tasks', task);

export const patchTaskApi = (task: Partial<TaskUpdateClient>): Promise<Task> => {
    return apiInstance.patch<Task>(`/tasks/${task.id}`, task);
};

export const deleteTaskApi = (id: number) => {
    return apiInstance.delete(`/tasks/${id}`);
};