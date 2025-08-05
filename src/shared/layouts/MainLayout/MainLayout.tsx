'use client'

import { Task } from "@/entities/Task/model/types";
import { TaskList } from "@/shared/ui/TaskList/TaskList"
import { TaskLayout } from "../TaskLayout/TaskLayout";
import { PageName, useTaskStore } from "@/shared/store/useTaskStore";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { LuSquareArrowRight } from "react-icons/lu";

interface MainLayoutProps
{
    data?: Task[]
}

export const MainLayout = ({data}: MainLayoutProps) =>
{
    const { deleteTask, getTask, hasHydrated, getPageSelectedTaskId, setPageSelectedTask, currentPage } = useTaskStore();
    const [hide, setHide] = useState(false);
    if (!hasHydrated) return null;
    return(
        <div 
            className="flex min-h-[91vh] overflow-hidden"
        >
            {!hide ? 
                <>
                    <div className="w-4/10 grow-1">
                        <TaskList 
                            elements={data}  
                            onHide={()=>setHide(true)} 
                            hideAccept={currentPage ? getPageSelectedTaskId(currentPage)!==null : false}
                        />
                    </div>
                    <div className="w-[2px] bg-gray-300 cursor-col-resize hover:bg-gray-400" 
                        onMouseDown={(e) => {
                            const startX = e.clientX;
                            const leftPanel = e.currentTarget.previousElementSibling as HTMLElement;
                            const startWidth = leftPanel.offsetWidth;
                            
                            const onMouseMove = (e: MouseEvent) => {
                                const container = leftPanel.parentElement as HTMLElement;
                                const containerWidth = container.offsetWidth;
                                const newWidth = startWidth + (e.clientX - startX);
                                const clampedWidth = Math.max(450, Math.min(containerWidth - 450, newWidth));
                                leftPanel.style.width = clampedWidth + 'px';
                                leftPanel.style.flex = 'none';
                            };
                            
                            const onMouseUp = () => {
                                document.removeEventListener('mousemove', onMouseMove);
                                document.removeEventListener('mouseup', onMouseUp);
                            };
                            
                            document.addEventListener('mousemove', onMouseMove);
                            document.addEventListener('mouseup', onMouseUp);
                        }}
                    />
                </>
            : <div>
                <Button variant="tertiary" 
                    className="!px-2 h-full !bg-secondary !rounded-none" 
                    onClick={()=>setHide(false)}
                >
                    <LuSquareArrowRight size={28}/>
                </Button>
            </div>
            }
            {getPageSelectedTaskId(currentPage) !== null && (
                <div className="w-6/10 grow-1 overflow-hidden min-w-0">
                    <TaskLayout task={getTask(getPageSelectedTaskId(currentPage)!)}/>
                </div>
            )}
        </div>
    )
}