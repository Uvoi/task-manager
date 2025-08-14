'use client'

import { MainLayout } from "@/shared/layouts/MainLayout/MainLayout";
import { PageName, useTaskStore } from "@/shared/store/useTaskStore";
import { useEffect } from "react";

const PAGE:PageName = "in_progress"
export const InProgress = () =>
{
    const { fetchTasks, getTasksByStatus, setCurrentPage } = useTaskStore();

    useEffect(() => {
        setCurrentPage(PAGE);
        fetchTasks({status: PAGE});
    }, [setCurrentPage]);
    const todoTasks = getTasksByStatus(PAGE);

    return(
        <MainLayout data={todoTasks}/>
    )
}