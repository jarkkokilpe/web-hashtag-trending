import { create } from 'zustand';

export const DATASOURCE_MOCK = 'mock';
export const DATASOURCE_XAPI = 'xapi';
export const DATASOURCE_REDDIT = 'reddit';

interface StoreState {
  dataSource: string;
  setDataSource: (mode: string) => void;
}

const useDataSourceStore = create<StoreState>((set) => ({
  dataSource: DATASOURCE_REDDIT,
  setDataSource: (mode) => set({ dataSource: mode }),
}));

export default useDataSourceStore;