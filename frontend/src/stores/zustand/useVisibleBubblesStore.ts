import { create } from 'zustand';
import { AreaData } from '../../types/interfaces';

interface VisibleBubblesState {
  visibleBubbles: AreaData[];
  setVisibleBubbles: (area: AreaData[]) => void;
}

const useVisibleBubblesStore = create<VisibleBubblesState>((set) => ({
  visibleBubbles: [],
  setVisibleBubbles: (area: AreaData[]) => set({ visibleBubbles: area }),
}));

export default useVisibleBubblesStore;