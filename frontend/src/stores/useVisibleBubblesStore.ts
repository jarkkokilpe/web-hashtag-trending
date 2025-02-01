import { create } from 'zustand';
import { BubbleData } from '../types/interfaces';

interface VisibleBubblesState {
  visibleBubbles: BubbleData[];
  setVisibleBubbles: (bubbles: BubbleData[]) => void;
}

const useVisibleBubblesStore = create<VisibleBubblesState>((set) => ({
  visibleBubbles: [],
  setVisibleBubbles: (bubbles:any) => set({ visibleBubbles: bubbles }),
}));

export default useVisibleBubblesStore;