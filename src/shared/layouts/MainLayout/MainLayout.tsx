import { Task } from "@/shared/ui/TaskList/model/types";
import { TaskList } from "@/shared/ui/TaskList/TaskList"

interface MainLayoutProps
{
    children: React.ReactNode
}

const DEBUG_TASKS: Task[] = [
    {
        title: "Sample Task 1",
        description: "This is a sample task description.",
        status: "todo",
        dueDate: new Date(),
        priority: "medium",
        tags: ["urgent", "work"]
    },
    {
        title: "Sample Task 2",
        description: "This is another sample task description.",
        status: "in-progress",
        dueDate: new Date(),
        priority: "high",
        tags: ["feature", "development"]
    },
    {
        title: "Sample Task 3",
        description: "This is yet another sample task description.",
        status: "done",
        dueDate: new Date(),
        priority: "low",
        tags: ["testing", "review"]
    }
];

export const MainLayout = ({children}: MainLayoutProps) =>
{
    return(
        <div>
            <TaskList elements={DEBUG_TASKS}/>
            {children}
        </div>
    )
}