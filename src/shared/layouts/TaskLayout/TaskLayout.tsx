import { Task } from "@/entities/Task/model/types";
import { Button } from "@/shared/ui/Button/Button";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useState } from "react";
import { CgCloseR } from "react-icons/cg";

interface TaskLayoutProps
{
    task?: Task;
    onClose: () => void;
}


export const TaskLayout = ({task, onClose}:TaskLayoutProps) =>
{
    const [title, setTitle] = useState(task?.title)
    const [description, setDescription] = useState(task?.description)
    const handleEditTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setTitle(e.target.value)
    }
    const handleEditDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setDescription(e.target.value)
    }
    return(
        <div
            className="w-full flex flex-col p-6"
        >
            <Button variant="tertiary" className="self-end !p-0 mb-4" onClick={onClose}><CgCloseR size={28}/></Button>
            <div>
                <div
                    className="flex"
                >
                    <TextArea value={title} onChange={handleEditTitle}
                        className="w-full text-[1.2rem] h-[2.7rem]"
                    />
                    <span>{task?.status}</span>
                </div>
                <div
                    className="flex justify-between"
                >
                    {task?.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                    <div
                        className="flex"
                    >
                        <span>{task?.priority}</span>
                        <span>{task?.dueDate}</span>
                    </div>
                </div>
                <div
                    className="flex"
                >
                    <span>{task?.creationDate}</span>
                    <span>{task?.updatedDate}</span>
                </div>
            </div>
            <div>
                <TextArea value={description} onChange={handleEditDescription}
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}