import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AreaData } from '../../../types/interfaces';

interface VisibleBubblesState {
  visibleBubbles: AreaData[];
}

const initialState: VisibleBubblesState = {
  visibleBubbles: [], // Default value
};

const visibleBubblesSlice = createSlice({
  name: 'visibleBubbles',
  initialState,
  reducers: {
    setVisibleBubbles: (state, action: PayloadAction<AreaData[]>) => {
      state.visibleBubbles = action.payload;
    },
  },
});

export const { setVisibleBubbles } = visibleBubblesSlice.actions;

export default visibleBubblesSlice.reducer;