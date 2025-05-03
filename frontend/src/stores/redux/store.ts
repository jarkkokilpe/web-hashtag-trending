import { configureStore } from '@reduxjs/toolkit';
import dataModeReducer from './slices/dataModeSlice';
import dataSourceReducer from './slices/dataSourceSlice';
import visibleBubblesReducer from './slices/visibleBubblesSlice';
import sidebarReducer from './slices/sideBarSlice';
import infoBoxReducer from './slices/infoBoxSlice';
import mobileReducer from './slices/mobileSlice';

const store = configureStore({
  reducer: {
    dataMode: dataModeReducer,
    dataSource: dataSourceReducer,
    visibleBubbles: visibleBubblesReducer,
    sidebar: sidebarReducer,
    infoBox: infoBoxReducer,
    mobile: mobileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;