import { create } from 'zustand';

export const DATAMODE_VOLUME = 'volume';
export const DATAMODE_DENSITY = 'density';
export const DATAMODE_CHANGE = 'change';

export type DataMode = typeof DATAMODE_VOLUME | typeof DATAMODE_DENSITY | typeof DATAMODE_CHANGE;

interface StoreState {
  mode: DataMode;
  setMode: (mode: DataMode) => void;
}

const useDataModeStore = create<StoreState>((set) => ({
  mode: DATAMODE_VOLUME,
  setMode: (mode) => set({ mode }),
}));

export default useDataModeStore;