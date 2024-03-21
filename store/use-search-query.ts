import { create } from 'zustand';

interface FiltersStore {
  name: string;
  setName: (filters: any) => void;
  resetFilters: () => void;
}

interface IFilters {
  name: ""
}

export const useSearchQuery = create<FiltersStore>((set) => ({
  name: '',
  setName: (name) => set({ name: name }),
  resetFilters: () => set({name: ''}),
}));
