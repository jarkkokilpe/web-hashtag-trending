import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoBoxState {
  isVisible: boolean;
}

const initialState: InfoBoxState = {
  isVisible: false, // Default value
};

const infoBoxSlice = createSlice({
  name: 'infoBox',
  initialState,
  reducers: {
    showInfoBox(state) {
      state.isVisible = true;
    },
    hideInfoBox(state) {
      state.isVisible = false;
    },
    setInfoBoxVisibility(state, action: PayloadAction<boolean>) {
      state.isVisible = action.payload;
    },
  },
});

export const { showInfoBox, hideInfoBox, setInfoBoxVisibility } = infoBoxSlice.actions;
export default infoBoxSlice.reducer;