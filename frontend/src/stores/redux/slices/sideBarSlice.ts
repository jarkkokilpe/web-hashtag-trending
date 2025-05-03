import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isHidden: boolean;
}

const initialState: SidebarState = {
  isHidden: false, // Default value
};

const sidebarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isHidden = !state.isHidden;
    },
    setSidebarHidden(state, action: PayloadAction<boolean>) {
      state.isHidden = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarHidden } = sidebarSlice.actions;
export default sidebarSlice.reducer;