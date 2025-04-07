import { createSlice } from '@reduxjs/toolkit';

export const DATAMODE_VOLUME = 'volume';
export const DATAMODE_DENSITY = 'density';
export const DATAMODE_CHANGE = 'change';

export type DataMode = typeof DATAMODE_VOLUME | typeof DATAMODE_DENSITY | typeof DATAMODE_CHANGE;

interface DataModeState {
  dataMode: DataMode;
}

const initialState: DataModeState = {
  dataMode: DATAMODE_VOLUME, // Default value
};

interface SetDataModeAction {
  payload: DataMode;
  type: string;
}

const dataModeSlice = createSlice({
  name: 'dataMode',
  initialState,
  reducers: {
    setDataMode: (state: DataModeState, action: SetDataModeAction) => {
      state.dataMode = action.payload;
    },
  },
});

export const { setDataMode } = dataModeSlice.actions;

export default dataModeSlice.reducer;