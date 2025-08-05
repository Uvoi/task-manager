import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus } from '@/entities/Task/model/types';

interface TaskStore {
    tasks: Task[];
    pages: Record<PageName, PageState>;
    currentPage: PageName | null;
    addTask: (task: Task) => void;
    deleteTask: (id: number) => void;
    getTask: (id: number) => Task | undefined;
    getTasksByTag: (tag: string) => Task[];
    getTasksByStatus: (status: TaskStatus) => Task[];
    hasHydrated: boolean;
    
    setHasHydrated: (state: boolean) => void;
    setPageSelectedTask: (page: PageName, taskId: number | null) => void;
    getPageSelectedTaskId: (page: PageName | null) => number | null;
    setTaskOrder: (page: PageName | null, order: number[]) => void;
    getTaskOrder: (page: PageName | null) => number[];
    setCurrentPage: (page: PageName | null) => void;
}

interface PageState {
    selectedTaskId: number | null;
    taskOrder: number[];
}

export type PageName = 'todo' | 'in-progress' | 'done';

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
        tasks: [],
        pages: {
            todo: { selectedTaskId: null, taskOrder: [] },
            'in-progress': { selectedTaskId: null, taskOrder: [] },
            done: { selectedTaskId: null, taskOrder: [] },
        },
        currentPage: null,

        addTask: (task) =>
            set((state) => {
            const exists = state.tasks.some((t) => t.id === task.id);
            return exists ? state : { tasks: [...state.tasks, task] };
            }),

        deleteTask: (id) => {
            set((state) => {
              const newTasks = state.tasks.filter((task) => task.id !== id);
              return {
                tasks: newTasks,
              };
            });
        },

        getTask: (id) => get().tasks.find((task) => task.id === id),

        getTasksByTag: (tag: string) => get().tasks.filter((task) => task.tags?.includes(tag)),

        getTasksByStatus: (status: TaskStatus) => get().tasks.filter((task) => task.status === status),
        
        hasHydrated: false,
        setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
        setPageSelectedTask: (page: PageName, taskId: number | null) => set((state) => ({
            pages: {
                ...state.pages,
                [page]: {
                    ...state.pages[page],
                    selectedTaskId: taskId,
                },
            },
        })),

        getPageSelectedTaskId: (page: PageName | null) => {
            if (page === null) return null;
            const { pages } = get();
            if (pages[page].selectedTaskId !== null) {
                const task = get().getTask(pages[page].selectedTaskId);
                return task?.id ?? null;
            }
            return null;
        },

        setTaskOrder: (page: PageName | null, order: number[]) => {
            if (page === null) return null;
            set((state) => ({
                pages: {
                    ...state.pages,
                    [page]: {
                        ...state.pages[page],
                        taskOrder: order,
                    },
                },
            }))
        },

        getTaskOrder: (page: PageName | null) => (page !== null ? get().pages[page].taskOrder : []),  
        setCurrentPage: (page: PageName | null) => set({ currentPage: page }),
    }),
    {
        name: 'task-storage',
        onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true);
      },
    }
  )
);
