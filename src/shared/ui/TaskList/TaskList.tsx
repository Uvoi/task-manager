import { Task } from "@/entities/Task/model/types";
import { TaskItem } from "./TaskItem";
import { LuSquareArrowLeft } from "react-icons/lu";
import { Button } from "../Button/Button";

interface TaskListProps
{
    elements?: Task[];
    add: (task: Task) => void;
    del: (id: number) => void;
    select: (id: number) => void;
    selected: number | null;
    onHide: () => void;
    hideAccept: boolean;
}

export const TaskList = ({elements, add, del, select, selected, onHide, hideAccept}:TaskListProps) =>
{
    return(
        <div
            className="w-full flex flex-col bg-secondary p-6"
        >
            {hideAccept && <Button variant="tertiary" className="self-end !p-0 mb-4" onClick={onHide}><LuSquareArrowLeft size={28}/></Button>}
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