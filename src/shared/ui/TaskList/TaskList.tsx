'use client'

import { Task, TaskCreateInput } from "@/entities/Task/model/types";
import { TaskListItem } from "./TaskListItem";
import { LuSquareArrowLeft } from "react-icons/lu";
import { Button } from "../Button/Button/Button";
import { CgAddR } from "react-icons/cg";
import { useTaskStore } from "@/shared/store/useTaskStore";
import { createTaskApi } from "@/entities/Task/api/tasks";

interface TaskListProps
{
    elements?: Task[];
    onHide: () => void;
    hideAccept: boolean;
}

export const TaskList = ({elements, onHide, hideAccept}:TaskListProps) =>
{
    const {addTask, setPageSelectedTask, currentPage} = useTaskStore()
    const addNewTask = () =>
    {
        const newEmptyTask: TaskCreateInput =
        {
            title: "", 
            description: "", 
            status: currentPage ? currentPage : 'unset',
            dueDate: new Date().toISOString(), 
            creatorId: 0
        }

        createTaskApi(newEmptyTask).then((task: Task) =>
        {
            addTask(task);
            setPageSelectedTask(currentPage!, task.id)
        });
    }

    return(
        <div
            className="w-full flex flex-col bg-text-tertiary p-6 pt-3 min-h-[91vh]"
        >
            {hideAccept &&
                <div className="w-full flex justify-between mb-4">
                    <Button variant="tertiary" className="!p-0 " onClick={addNewTask}><CgAddR size={28}/></Button>
                    <Button variant="tertiary" className="!p-0" onClick={onHide}><LuSquareArrowLeft size={28}/></Button>
                </div>
            }
            {elements && elements.length > 0 ? (
                <ul
                    className="flex flex-col gap-4 overflow-hidden" 
                >
                    {elements.map((element) => (
                        <li key={element.id}
                            className="w-full overflow-hidden rounded-xl"
                        >
                            <TaskListItem task={element}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p>
            )}
            <Button 
                variant="primary" 
                color={elements && elements.length > 0 ? "secondary" : "accent"} 
                className="w-full mt-4 flex gap-2 justify-center items-center" 
                onClick={addNewTask}
            >
                <CgAddR size={18}/>
                Add new task
            </Button>
        </div>
    )
}