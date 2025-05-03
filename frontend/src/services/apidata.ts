import axios from 'axios';
import { TrendApiObj } from '../types/interfaces';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const syncTimeWithServer = async (): Promise<number> => {
  const t1 = Date.now();
  const response = await axios.get<{ timestamp: number }>(`${API_BASE_URL}/trends/time/sync`);
  const t2 = Date.now();
  const serverTime = response.data.timestamp;

  const latency = (t2 - t1) / 2;
  const adjustedServerTime = serverTime + latency;
  const offset = adjustedServerTime - t2;

  return offset;
};

// Fetch all trends
export const fetchAllTrends = async (dataSource: string): Promise<TrendApiObj[]> => {
  try {
    const response = await axios.get<TrendApiObj[]>(`${API_BASE_URL}/trends/${dataSource}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all trends:', error);
    return [];
  }
}

// Fetch delta trends
export const fetchDeltaTrends = async (dataSource: string, lastUpdate: number): Promise<TrendApiObj[]> => {
  try {
    const response = await axios.get<TrendApiObj[]>(
      `${API_BASE_URL}/trends/${dataSource}/delta?since=${lastUpdate}`
    );
    //console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching delta trends:', error);
    return [];
  }
};

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
      subscriptions: 0,
      updatedAt: 0
    };
  }
}
