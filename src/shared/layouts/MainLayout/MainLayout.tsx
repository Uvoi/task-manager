'use client'

import { Task } from "@/entities/Task/model/types";
import { TaskList } from "@/shared/ui/TaskList/TaskList"
import { TaskLayout } from "../TaskLayout/TaskLayout";
import { useTaskStore } from "@/shared/store/useTaskStore";
import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { LuSquareArrowRight } from "react-icons/lu";

interface MainLayoutProps
{
    data?: Task[]
}

export const MainLayout = ({data}: MainLayoutProps) =>
{
    const { getTask, hasHydrated, getPageSelectedTaskId, currentPage } = useTaskStore();
    const [hide, setHide] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    
    useEffect(() => {
        if (getPageSelectedTaskId(currentPage) === null) {
            const sidebar = document.querySelector('.sidebar-panel') as HTMLElement;
            if (sidebar) {
                sidebar.style.width = '';
                sidebar.style.flex = '';
            }
        }
    }, [getPageSelectedTaskId(currentPage)]);
    
    if (!hasHydrated) return null;

    const handleHideSidebar = () =>
    {
        const sidebar = document.querySelector('.sidebar-panel') as HTMLElement;
        if (sidebar) {
            sidebar.style.width = '';
            sidebar.style.flex = '';
        }
        setHide(true)
    }
    const handleShowSidebar = () =>
    {
        setHide(false)
    }

    return(
        <div 
            className="flex min-h-[91vh] overflow-hidden"
        >
            <div className={`sidebar-panel ${!isResizing ? 'transition-all duration-300 ease-in-out' : ''} ${hide ? 'w-0 overflow-hidden' : getPageSelectedTaskId(currentPage) !== null ? 'w-4/10' : 'w-full'}`}>
                <TaskList 
                    elements={data}  
                    onHide={handleHideSidebar} 
                    hideAccept={currentPage ? getPageSelectedTaskId(currentPage)!==null : false}
                />
            </div>
            {!hide && getPageSelectedTaskId(currentPage) !== null && (
                <div className="w-[2px] bg-gray-300 cursor-col-resize hover:bg-gray-400" 
                    onMouseDown={(e) => {
                        setIsResizing(true);
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
                            setIsResizing(false);
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };
                        
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    }}
                />
            )}
            <div className={`transition-all duration-300 ease-in-out ${hide ? 'w-auto' : 'w-0 overflow-hidden'}`}>
                <Button variant="tertiary" 
                    className="!px-2 h-full !bg-secondary !rounded-none" 
                    onClick={handleShowSidebar}
                >
                    <LuSquareArrowRight size={28}/>
                </Button>
            </div>
            <div className={`${!isResizing ? 'transition-all duration-300 ease-in-out' : ''} ${getPageSelectedTaskId(currentPage) !== null ? 'w-6/10 grow-1' : 'w-0'} overflow-hidden min-w-0`}>
                {getPageSelectedTaskId(currentPage) !== null && (
                    <TaskLayout task={getTask(getPageSelectedTaskId(currentPage)!)}/>
                )}
            </div>
        </div>
    )
}