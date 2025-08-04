import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus } from '@/entities/Task/model/types';

interface TaskStore {
    tasks: Task[];
    selectedTaskId: number | null;
    addTask: (task: Task) => void;
    deleteTask: (id: number) => void;
    selectTask: (id: number | null) => void;
    getTask: (id: number) => Task | undefined;
    getSelectedTask: () => Task | undefined;
    getTasksByTag: (tag: string) => Task[];
    getTasksByStatus: (status: TaskStatus) => Task[];
    hasHydrated: boolean,
    setHasHydrated: (state: boolean) => void,
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
        selectedTaskId: null,

        addTask: (task) =>
            set((state) => {
            const exists = state.tasks.some((t) => t.id === task.id);
            return exists ? state : { tasks: [...state.tasks, task] };
            }),

        deleteTask: (id) =>
            set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
            selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
            })),

        selectTask: (id) => set({ selectedTaskId: id }),

        getTask: (id) => get().tasks.find((task) => task.id === id),

        getSelectedTask: () => {
            const { tasks, selectedTaskId } = get();
            return tasks.find((task) => task.id === selectedTaskId);
        },

        getTasksByTag: (tag: string) => get().tasks.filter((task) => task.tags?.includes(tag)),

        getTasksByStatus: (status: TaskStatus) => get().tasks.filter((task) => task.status === status),
        
        hasHydrated: false,
        setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
        name: 'task-storage',
        onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true);
      },
    }
  )
);
