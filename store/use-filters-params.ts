import { create } from 'zustand';

interface FiltersStore {
  filters: IFilters;
  setFilters: (filters: any) => void;
  resetFilters: () => void;
}

interface IFilters {
  filterBy: string;
  exam_id: string;
  page_number: number;
}

export const useFilters = create<FiltersStore>((set) => ({
  filters: {
    filterBy: '',
    exam_id: '',
    page_number: 0,
  },
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: { filterBy: '', exam_id: '', page_number: 0 } }),
}));
