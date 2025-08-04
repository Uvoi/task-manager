import { TaskPriority, TaskStatus } from "@/entities/Task/model/types"

export const taskPriorityColor: Record<TaskPriority, "success" | "warning" | "error" | "primary"> =
{
    low:"success",
    medium: "warning",
    high: "error",
    unset: "primary"
}

export const taskStatusColor: Record<TaskStatus, "success" | "warning" | "primary" | "tertiary"> =
{
    todo: "tertiary",
    "in-progress": "warning",
    done: "success",
    unset: "primary"
}