import { create } from 'zustand';

export const DATAMODE_VOLUME = 'volume';
export const DATAMODE_DENSITY = 'density';
export const DATAMODE_CHANGE = 'change';

export type DataMode = typeof DATAMODE_VOLUME | typeof DATAMODE_DENSITY | typeof DATAMODE_CHANGE;

interface StoreState {
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
}

const useDataModeStore = create<StoreState>((set) => ({
  dataMode: DATAMODE_VOLUME,
  setDataMode: (mode) => set({ dataMode: mode }),
}));

export default useDataModeStore;