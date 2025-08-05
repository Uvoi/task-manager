'use client'

import { MainLayout } from "@/shared/layouts/MainLayout/MainLayout";
import { PageName, useTaskStore } from "@/shared/store/useTaskStore";
import { useEffect } from "react";

const PAGE:PageName = "done"
export const Done = () =>
{
    const { getTasksByStatus, setCurrentPage } = useTaskStore();

    useEffect(() => {
        setCurrentPage(PAGE);
    }, [setCurrentPage]);
    const todoTasks = getTasksByStatus(PAGE);

    return(
        <MainLayout data={todoTasks}/>
    )
}