import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const DATASOURCE_MOCK = 'mock';
export const DATASOURCE_XAPI = 'xapi';
export const DATASOURCE_REDDIT = 'reddit';

interface DataSourceState {
  dataSource: string;
}

const initialState: DataSourceState = {
  dataSource: DATASOURCE_REDDIT, // Default value
};

const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState,
  reducers: {
    setDataSource: (state, action: PayloadAction<string>) => {
      state.dataSource = action.payload;
    },
  },
});

export const { setDataSource } = dataSourceSlice.actions;

export default dataSourceSlice.reducer;