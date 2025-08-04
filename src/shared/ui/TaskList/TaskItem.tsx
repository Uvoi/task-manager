import { Task } from "@/entities/Task/model/types";
import { Button } from "../Button/Button";

interface TaskItemProps
{
    task: Task;
    del: (id: number) => void;
    select: (id: number) => void;
    selected: number | null;
}
export const TaskItem = ({task, del, select, selected}:TaskItemProps) =>
{
    return(
        <Button
            variant="tertiary"
            className="flex flex-col border-2 gap-2 p-4 w-full !items-stretch"
            onClick={()=>{select(task.id)}}
        >
            <div
                className="flex items-center justify-between"
            >
                <div className="flex flex-col">
                    {task.title && <p className="weight font-[700]">{task.title}</p>}
                    {task.tags && <div 
                        className="flex gap-2"
                    >{task.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
                </div>
                {task.dueDate && <span>{task.dueDate}</span>}
            </div>
            {task.description && <p
                className="text-left whitespace-nowrap overflow-hidden text-ellipsis"
            >{task.description}</p>}
            <div
                className="flex justify-between"
            >
                {task.creationDate && <span
                    className="text-text-secondary text-[14px]"
                >created: {task.creationDate}</span>}
                {task.status && <span>{task.status}</span>}
            </div>
        </Button>
    )
}