import { Task } from "@/entities/Task/model/types";
import { TaskListItem } from "./TaskListItem";
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
            className="w-full flex flex-col bg-text-tertiary p-6 pt-3 min-h-[91vh]"
        >
            {hideAccept && <Button variant="tertiary" className="self-end !p-0 mb-4" onClick={onHide}><LuSquareArrowLeft size={28}/></Button>}
            {elements && elements.length > 0 ? (
                <ul
                    className="flex flex-col gap-4 overflow-hidden" 
                >
                    {elements.map((element) => (
                        <li key={element.id}
                            className="w-full overflow-hidden rounded-xl"
                        >
                            <TaskListItem task={element} del={del} select={select} selected={selected}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    )
}