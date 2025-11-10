'use client'

import { Task } from "@/entities/Task/model/types";
import { Button } from "../Button/Button/Button";
import { Chip } from "../Chip/Chip";
import { taskPriorityColor, taskStatusColor } from "@/features/Task/lib/Task";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState } from "react";
import { useTaskStore } from "@/shared/store/useTaskStore";
import { formatDate } from "@/shared/lib/common/transitions";
import { DialogModal } from "../Modal/DialogModal";
import { deleteTaskApi } from "@/entities/Task/api/tasks";

interface TaskListItemProps
{
    task: Task;
}
export const TaskListItem = ({task}:TaskListItemProps) =>
{
    const { deleteTask, setPageSelectedTask, currentPage } = useTaskStore();
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    if (currentPage === null) return null;
    const [moveStyles, setMoveStyles] = useState("");

    const handleContextMenu = (e:React.MouseEvent) =>
    {
        e.preventDefault();
        setMoveStyles((prev) => (prev ? "" : "ml-[-10%]"));
    }

    const handleDelete = () =>
    {
        deleteTaskApi(task.id).then(()=>{
            deleteTask(task.id);
        })
    }

    return(
        <div className={`w-[110%] flex bg-primary transition-all duration-300 ease-in-out ${moveStyles}`}>
            <Button
                onContextMenu={handleContextMenu}
                className="flex flex-col gap-2 p-4 w-[100%] !items-stretch overflow-hidden rounded-xl"
                onClick={()=>{setPageSelectedTask(currentPage, task.id)}}
            >
                <div
                    className="flex items-center justify-between"
                >
                    <div className="flex flex-col gap-2">
                        {task.title && <p className="font-[700]">{task.title}</p>}
                        {task.tags && <div 
                            className="flex gap-2"
                        >
                            {task.tags.map((tag) => <Chip className="text-[0.8rem]" key={tag.id} value={tag.name} variant='outlined' color={tag.hex}/>)}
                        </div>}
                    </div>
                    <div className="flex gap-2 text-[0.8rem]">
                        {task.status && <Chip value={task.status} color={task.status && taskStatusColor[task.status]}/>}
                        <Chip rounded={false} value={task.priority} color={task.priority && taskPriorityColor[task.priority]}/>
                        {task.dueDate && <span>{formatDate(task.dueDate)}</span>}
                    </div>
                </div>
                {task.description && <p
                    className="text-left whitespace-nowrap overflow-hidden text-ellipsis text-[0.9rem]"
                >{task.description}</p>}
                <div
                    className="flex justify-between"
                >
                    {task.creationDate && <span className="text-text-secondary text-[14px]">created: {formatDate(task.creationDate)}</span>}
                    {task.updatedDate && <span className="text-text-secondary text-[14px]">updated: {formatDate(task.updatedDate)}</span>}
                </div>
            </Button>
            <div className="w-[10%] h-auto flex items-center justify-center bg-secondary">
                <Button variant="tertiary" className="!p-0" onClick={()=>setOpenDeleteModal(true)}><RiDeleteBin2Line size={28}/></Button>
            </div>
            <DialogModal 
                onClose={()=>setOpenDeleteModal(false)} 
                isOpen={openDeleteModal} 
                yesText="Yes" 
                noText="Cancel" 
                yesFunc={handleDelete}
                yesColor="error"
            >
                Do you really want to delete the task?
            </DialogModal>
        </div>
    )
}