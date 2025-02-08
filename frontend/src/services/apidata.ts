import axios from 'axios';
import { TrendApiObj } from '../types/interfaces'; // Adjust the import path as necessary

// Fetch all trends
export const fetchAllTrends = async (): Promise<TrendApiObj[]> => {
  try {
    const response = await axios.get<TrendApiObj[]>('http://localhost:4000/trends/all');
    console.log('All Trends:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all trends:', error);
    return [];
  }
}

// Fetch a single trend by woeid
export const fetchSingleTrend = async (woeid: number): Promise<TrendApiObj> => {
  try {
    const response = await axios.get<TrendApiObj>(`http://localhost:4000/trends/single/${woeid}`);
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
      trends: []
    };
  }
}
