import { Task } from "@/entities/Task/model/types";
import { TextArea } from "@/shared/ui/TextArea/TextArea";
import { useState } from "react";

interface TaskLayoutProps
{
    task?: Task;
}


export const TaskLayout = ({task}:TaskLayoutProps) =>
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
            className="w-1/2 flex flex-col"
        >
            <div>
                <div
                    className="flex"
                >
                    <span>{task?.status}</span>
                    <TextArea value={title} onChange={handleEditTitle}
                        className="w-full resize-none"
                    />
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
                    className="w-full h-full resize-none"
                />
            </div>
        </div>
    )
}