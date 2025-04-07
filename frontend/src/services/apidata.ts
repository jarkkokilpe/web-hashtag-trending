import axios from 'axios';
import { TrendApiObj } from '../types/interfaces';
// import useDataSourceStore from '../stores/zustand/useDataSourceStore';
import store from '../stores/redux/store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch all trends
export const fetchAllTrends = async (): Promise<TrendApiObj[]> => {
  //const dataSource: string = useDataSourceStore.getState().dataSource; // zustand approach
  const state = store.getState(); // Access the current state with redux approach
  const dataSource = state.dataSource.dataSource;
  
  try {
    const response = await axios.get<TrendApiObj[]>(`${API_BASE_URL}/trends/${dataSource}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all trends:', error);
    return [];
  }
}

// Fetch a single trend by woeid - not used in the current implementation
export const fetchSingleTrend = async (woeid: number): Promise<TrendApiObj> => {
  try {
    const response = await axios.get<TrendApiObj>(`${API_BASE_URL}/trends/single/${woeid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trend with woeid ${woeid}:`, error);
    return {
      woeid: 0,
      totalvolume: 0,
      totalvolumePrev: 0,
      diff2: 0,
      diff3: 0,
      diff5: 0,
      diff10: 0,
      trends: [],
      subscriptions: 0
    };
  }
}
