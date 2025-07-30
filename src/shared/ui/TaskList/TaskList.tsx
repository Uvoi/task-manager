import { Task } from "./model/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps
{
    elements?: Task[];
}

export const TaskList = ({elements}:TaskListProps) =>
{
    return(
        <div>
            {elements && elements.length > 0 ? (
                <ul>
                    {elements.map((element, index) => (
                        <li key={index}>
                            <TaskItem data={element}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    )
}