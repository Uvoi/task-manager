import { Task } from "./model/types"

interface TaskItemProps
{
    data: Task;
}
export const TaskItem = ({data}:TaskItemProps) =>
{
    return(
        <div>
            {data.title && <h3>{data.title}</h3>}
        </div>
    )
}