'use client'

import { Task } from "@/entities/Task/model/types";
import { MainLayout } from "@/shared/layouts/MainLayout/MainLayout"
import { useTaskStore } from "@/shared/store/useTaskStore";
import { useEffect } from "react";

const DEBUG_TASKS: Task[] = [
    {
        id: 0,
        title: "Sample Task 1",
        description: "This is a sample task description.",
        status: "todo",
        dueDate: "14.03.2025 14:35",
        creationDate: "17.03.2025 19:33",
        priority: "medium",
        tags: ["urgent", "work"]
    },
    {
        id: 1,
        title: "Sample Task 2",
        description: "This is another sample task description.",
        status: "in-progress",
        dueDate: "14.03.2025 14:35",
        creationDate: "17.03.2025 19:33",
        priority: "high",
        tags: ["feature", "development"]
    },
    {
        id: 2,
        title: "Sample Task 3",
        description: "This is yet another sample task description. This is yet another sample task description. This is yet another sample task description.",
        status: "done",
        dueDate: "14.03.2025 14:35",
        creationDate: "17.03.2025 19:33",
        priority: "low",
        tags: ["testing", "review"]
    }
];

export const Todo = () =>
{
    const { tasks, selectedTaskId, addTask, deleteTask, getTask, getTasksByStatus, getTasksByTag, selectTask } = useTaskStore();

    useEffect(() => {
        if (tasks.length === 0) {
            DEBUG_TASKS.forEach(addTask);
        }
    }, []);

    const todoTasks = getTasksByStatus("todo");

    return(
        <MainLayout data={todoTasks}/>
    )
}
