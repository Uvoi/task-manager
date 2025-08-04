'use client'

import { Task } from "@/entities/Task/model/types";
import { TaskList } from "@/shared/ui/TaskList/TaskList"
import { TaskLayout } from "../TaskLayout/TaskLayout";
import { useTaskStore } from "@/shared/store/useTaskStore";

interface MainLayoutProps
{
    data?: Task[]
}

export const MainLayout = ({data}: MainLayoutProps) =>
{
    const { selectedTaskId, addTask, deleteTask, getTask, selectTask, hasHydrated } = useTaskStore();
    if (!hasHydrated) return null;
    return(
        <div 
            className="flex gap-4"
        >
            <TaskList elements={data} add={addTask} del={deleteTask} select={selectTask} selected={selectedTaskId}/>
            {selectedTaskId!==null && <TaskLayout task={getTask(selectedTaskId)}/>}
        </div>
    )
}