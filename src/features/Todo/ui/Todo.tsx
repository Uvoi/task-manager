'use client'

import { Task } from "@/entities/Task/model/types";
import { MainLayout } from "@/shared/layouts/MainLayout/MainLayout"
import { PageName, useTaskStore } from "@/shared/store/useTaskStore";
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
        id: 4,
        title: "Sample Task 2",
        description: "This is another sample task description.",
        status: "in-progress",
        dueDate: "14.03.2025 14:35",
        creationDate: "17.03.2025 19:33",
        priority: "high",
        tags: ["feature", "development"]
    },
    {
        id: 9,
        title: "Sample Task 7",
        description: "This is yet another sample task description. This is yet another sample task description. This is yet another sample task description.",
        status: "in-progress",
        dueDate: "14.03.2025 14:35",
        creationDate: "17.03.2025 19:33",
        updatedDate: "17.03.2025 19:33",
        priority: "low",
        tags: ["testing", "review"]
    }
];

const PAGE:PageName = "todo";

export const Todo = () =>
{
    const { addTask, getTasksByStatus, setCurrentPage } = useTaskStore();

    // useEffect(() => {
    //     DEBUG_TASKS.forEach(addTask);
    // }, [addTask]);

    useEffect(() => {
        setCurrentPage(PAGE);
    }, [setCurrentPage]);

    const todoTasks = getTasksByStatus(PAGE);

    return(
        <MainLayout data={todoTasks}/>
    )
}
