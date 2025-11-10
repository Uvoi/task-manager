import { useState, useEffect, useRef } from "react";
import { CgCloseR } from "react-icons/cg";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteTaskApi, patchTaskApi } from "@/entities/Task/api/tasks";
import { Task } from "@/entities/Task/model/types";
import { taskPriorityColor, taskStatusColor } from "@/features/Task/lib/Task";
import { formatDate } from "@/shared/lib/common/transitions";
import { useTaskStore } from "@/shared/store/useTaskStore";
import { Button } from "@/shared/ui/Button/Button/Button";
import { Chip } from "@/shared/ui/Chip/Chip";
import { DialogModal } from "@/shared/ui/Modal/DialogModal";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { TagsList } from "@/features/Tag/ui/TagsList";

interface TaskLayoutProps
{
    task?: Task;
}


export const TaskLayout = ({task}:TaskLayoutProps) =>
{
    const { deleteTask, setPageSelectedTask, currentPage, updateTask, fetchTasks } = useTaskStore();
    if (currentPage === null || task===undefined) return null;
    const [title, setTitle] = useState(task.title)
    const [editTitle, setEditTitle] = useState(false)
    const [description, setDescription] = useState(task.description);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>(task.tags?.map(tag => tag.id) || []);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTitle(task.title)
        setDescription(task.description)
        setSelectedTagIds(task.tags?.map(tag => tag.id) || [])
    }, [task])
    

    const handleSave = async () =>
    {
        const newTitle = title !== task.title ? title : undefined;
        const newDescription = description !== task.description ? description : undefined;
        const originalTagIds = task.tags?.map(tag => tag.id) || [];
        const tagsChanged = JSON.stringify(selectedTagIds.sort()) !== JSON.stringify(originalTagIds.sort());
        
        await patchTaskApi({
            id: task.id,
            title: newTitle,
            description: newDescription,
            tags: tagsChanged ? selectedTagIds : undefined,
            updatedDate: new Date().toISOString(),
        }).then((task: Task)=>
            {
                updateTask(task);
                fetchTasks();
            }
        )
        
    }
    
    useEffect(() => {
        if (editTitle && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }, [editTitle]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyS') {
                e.preventDefault();
                handleSave();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleSave]);

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
        setPageSelectedTask(currentPage, null);
    }

    const handleDelete = () =>
    {
        deleteTaskApi(task.id).then(()=>{
            deleteTask(task.id);
            handleClose();
        })
    }

    return(
        <div
            className="w-full flex flex-col p-6 pt-3 h-full overflow-hidden min-w-0"
        >
            <div className="mb-4 flex justify-between">
                <Button variant="tertiary" className="!p-0" onClick={()=>setOpenDeleteModal(true)}><RiDeleteBin2Line size={28}/></Button>
                <Button variant="secondary" color="success" className="!py-0" onClick={handleSave}>save</Button>
                <Button variant="tertiary" className="!p-0" onClick={handleClose}><CgCloseR size={28}/></Button>
            </div>
            <div className="flex flex-col gap-2">
                <div
                    className="flex items-center relative"
                >
                    <p 
                        className="text-primary font-[700] w-full text-[1.2rem] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis py-2" 
                        onClick={()=>setEditTitle(true)}
                    >
                        {title ? title : <span className="text-gray30">Title</span>}
                    </p>
                    {editTitle && (
                        <TextArea 
                            ref={textareaRef}
                            value={title}
                            onChange={handleEditTitle}
                            className="absolute top-0 left-0 w-full text-[1.2rem] z-10 bg-bg-primary text-primary"
                            placeholder="Title"
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
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 justify-end">
                            <Chip rounded={false} value={task.priority} color={task.priority && taskPriorityColor[task.priority]} className="overflow-x-scroll"/>
                            <Chip value={task.status} variant="filled" color={task.status && taskStatusColor[task.status]} className="overflow-x-scroll"/>
                        </div>
                        <div>
                            <TagsList 
                                show={selectedTagIds} 
                                className="w-[max-content]" 
                                onTagSelect={(tagId) => {
                                    setSelectedTagIds(prev => 
                                        prev.includes(tagId) 
                                            ? prev.filter(id => id !== tagId)
                                            : [...prev, tagId]
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="flex justify-between"
                >
                    <div className="flex gap-2 overflow-x-scroll">

                    </div>
                    <div
                        className="flex"
                    >
                        <span>{formatDate(task.dueDate)}</span>
                    </div>
                </div>
                <div
                    className="flex text-[0.8rem] text-text-secondary justify-between"
                >
                    <span>created: {formatDate(task.creationDate)}</span>
                    <span>updated: {formatDate(task.updatedDate)}</span>
                </div>
            </div>
            <div className="h-full overflow-hidden">
                <TextArea 
                    value={description || ""} 
                    onChange={handleEditDescription} 
                    variant="clear"
                    className="w-full h-full resize-none"
                    placeholder="Description"
                />
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