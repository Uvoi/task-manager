import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tag } from '@/entities/Tag/model/types';
import { createTagApi, getTagsApi } from '@/entities/Tag/api/tags';

interface TagStore {
    tags: Tag[];
    addTag: (tag: Omit<Tag, 'id'>) => void;
    deleteTag: (id: number) => void;
    updateTag: (tag: Tag) => void;
    fetchTags: () => Promise<void>;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useTagStore = create<TagStore>()(
  persist(
    (set, get) => ({
        tags: [],

        addTag: async (tag: Omit<Tag, 'id'>) => {
          const newTag = await createTagApi(tag);
          set(state => ({ tags: [...state.tags, newTag] }));
        },

        deleteTag: (id) => {
            set((state) => {
              const newTags = state.tags.filter((tag) => tag.id !== id);
              return {
                tags: newTags,
              };
            });
        },
        fetchTags: async () => {
            const data = await getTagsApi();
            set({ tags: data });
        },

        updateTag: (updatedTag) => {
            set({ tags: get().tags.map(t => t.id === updatedTag.id ? updatedTag : t) });
        },
        
        hasHydrated: false,
        setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
        name: 'tag-storage',
        onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true);
      },
    }
  )
);
