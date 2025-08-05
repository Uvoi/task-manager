import { Task } from "@/entities/Task/model/types";
import { taskPriorityColor, taskStatusColor } from "@/features/Task/lib/Task";
import { Button } from "@/shared/ui/Button/Button";
import { Chip } from "@/shared/ui/Chip/Chip";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useState, useEffect, useRef } from "react";
import { CgCloseR } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";

interface TaskLayoutProps
{
    task?: Task;
    onClose: () => void;
    onDelete: () => void;
}


export const TaskLayout = ({task, onClose, onDelete}:TaskLayoutProps) =>
{
    const [title, setTitle] = useState(task?.title)
    const [editTitle, setEditTitle] = useState(false)
    const [description, setDescription] = useState(task?.description)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (editTitle && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }, [editTitle]);
    const handleEditTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setTitle(e.target.value)
    }

    const handleEditDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setDescription(e.target.value)
    }

    const handleClose = () =>
    {
        onClose();
    }

    const handleDelete = () =>
    {
        onDelete();
        onClose();
    }

    return(
        <div
            className="w-full flex flex-col p-6 pt-3 h-full overflow-hidden min-w-0"
        >
            <div className="mb-4 flex justify-between">
                <Button variant="tertiary" className="!p-0" onClick={handleDelete}><RiDeleteBin2Line size={28}/></Button>
                <Button variant="tertiary" className="!p-0" onClick={handleClose}><CgCloseR size={28}/></Button>
            </div>
            <div className="flex flex-col gap-2">
                <div
                    className="flex items-center relative"
                >
                    <p className="text-primary font-[700] w-full text-[1.2rem] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis py-2" onClick={()=>setEditTitle(true)}>
                        {title}
                    </p>
                    {editTitle && (
                        <TextArea 
                            ref={textareaRef}
                            value={title} 
                            onChange={handleEditTitle}
                            className="absolute top-0 left-0 w-full text-[1.2rem] z-10 bg-bg-primary text-primary"
                            onBlur={()=>setEditTitle(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    setEditTitle(false);
                                } else if (e.key === 'Escape') {
                                    e.preventDefault();
                                    setEditTitle(false);
                                }
                            }}
                        />
                    )}
                    <div className="flex gap-2">
                        <Chip rounded={false} value={task?.priority} color={task?.priority && taskPriorityColor[task?.priority]} />
                        <Chip value={task?.status} variant="filled" color={task?.status && taskStatusColor[task.status]}/>
                    </div>
                </div>
                <div
                    className="flex justify-between"
                >
                    <div className="flex gap-2 overflow-x-scroll">
                        {task?.tags?.map((tag) => <Chip key={tag} value={tag}/>)}
                    </div>
                    <div
                        className="flex"
                    >
                        <span>{task?.dueDate}</span>
                    </div>
                </div>
                <div
                    className="flex text-[0.8rem] text-text-secondary justify-between"
                >
                    <span>created: {task?.creationDate}</span>
                    <span>updated: {task?.updatedDate}</span>
                </div>
            </div>
            <div className="h-full overflow-hidden">
                <TextArea value={description} onChange={handleEditDescription} variant="clear"
                    className="w-full h-full resize-none"
                />
            </div>
        </div>
    )
}