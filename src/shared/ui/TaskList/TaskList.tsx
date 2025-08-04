import { Task } from "@/entities/Task/model/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps
{
    elements?: Task[];
    add: (task: Task) => void;
    del: (id: number) => void;
    select: (id: number) => void;
    selected: number | null;
}

export const TaskList = ({elements, add, del, select, selected}:TaskListProps) =>
{
    return(
        <div
            className="w-1/2 grow"
        >
            {elements && elements.length > 0 ? (
                <ul
                    className="flex flex-col"
                >
                    {elements.map((element, index) => (
                        <li key={index}
                            className="w-full"
                        >
                            <TaskItem task={element} del={del} select={select} selected={selected}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    )
}