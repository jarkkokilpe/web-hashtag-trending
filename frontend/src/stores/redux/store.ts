import { configureStore } from '@reduxjs/toolkit';
import dataModeReducer from './slices/dataModeSlice';
import dataSourceReducer from './slices/dataSourceSlice';
import visibleBubblesReducer from './slices/visibleBubblesSlice';

const store = configureStore({
  reducer: {
    dataMode: dataModeReducer,
    dataSource: dataSourceReducer,
    visibleBubbles: visibleBubblesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;