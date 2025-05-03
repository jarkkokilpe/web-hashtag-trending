import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { fetchAllTrends, fetchDeltaTrends, syncTimeWithServer } from '../services/apidata';
import { numData as initialNumData  } from '../data/countryinfo';
import { usNumData as initialUsNumData  } from '../data/us/stateinfo';
import { AreaData, TrendContent, TrendApiObj  } from '../types/interfaces';
import { DATA_FETCH_INTERVAL_MS  } from '../config/constants';
// import useDataSourceStore from '../stores/zustand/useDataSourceStore';
import store from '../stores/redux/store';

interface TrendsContextProps {
  numData: AreaData[];
  setNumData: React.Dispatch<React.SetStateAction<AreaData[]>>;
  usNumData: AreaData[];
  setUsNumData: React.Dispatch<React.SetStateAction<AreaData[]>>;
}

interface TrendsProviderProps {
  children: React.ReactNode;
}

const TrendsApiContext = createContext<TrendsContextProps | undefined>(undefined);

const processTrendData = (data: AreaData[], trends: TrendApiObj[]): AreaData[] => {
  return data.map((info: AreaData) => {
    try {
      const trendData = trends.find((trend: { woeid: number }) => trend.woeid === info.woeid);
      
      if (trendData) {
        const topTrend = trendData.trends.reduce((prev: TrendContent, current: TrendContent) => (current.tweet_volume > prev.tweet_volume ? current : prev), trendData.trends[0]);
        return {
          ...info,
          trends: trendData.trends.map((trend: TrendContent) => ({
            name: trend.name,
            tweet_volume: trend.tweet_volume,
            link: trend.link,
          })),
          totalvolume: trendData.totalvolume,
          totalvolumePrev: trendData.totalvolumePrev,
          subscriptions: trendData.subscriptions,
          updatedAt: trendData.updatedAt,
          diff2: trendData.diff2,
          diff3: trendData.diff3,
          diff5: trendData.diff5,
          diff10: trendData.diff10,
          hashtag: {
            hashstr: topTrend?.name,
            count: topTrend?.tweet_volume,
          },
        };
      }
      return info;
    } catch (error) {
      console.error('Error processing trend data:', error);
      return info;
    }
  });
};

export const TrendsApiProvider: React.FC<TrendsProviderProps> = ({ children }) => {
  const [numData, setNumData] = useState<AreaData[]>(initialNumData);
  const [usNumData, setUsNumData] = useState<AreaData[]>(initialUsNumData);
  const lastUpdateRef = useRef(Date.now());
  const calibrationOffsetRef = useRef(0); 
  const isInitialFetch = useRef(true);
  const dataSourceRef = useRef(store.getState().dataSource.dataSource); 

  // Fetch and process trends
  const fetchAndProcessTrends = React.useCallback(async () => {
    try {
      if (isInitialFetch.current) {
        const trends = await fetchAllTrends(dataSourceRef.current);
        setNumData((prevNumData) => processTrendData(prevNumData, trends));
        setUsNumData((prevUsNumData) => processTrendData(prevUsNumData, trends));
        isInitialFetch.current = false;
      } else {
        const trends = await fetchDeltaTrends(dataSourceRef.current, lastUpdateRef.current);
        setNumData((prevNumData) => processTrendData(prevNumData, trends));
        setUsNumData((prevUsNumData) => processTrendData(prevUsNumData, trends));
        lastUpdateRef.current = Date.now() + calibrationOffsetRef.current;
      }
    } catch (error) {
      console.error('Error fetching trends:', error);
    }
  }, []);

  // Sync time with the server on mount
  useEffect(() => {
    const calibrateTime = async () => {
      try {
        const offset = await syncTimeWithServer();
        calibrationOffsetRef.current = offset;
        lastUpdateRef.current += offset;
        console.log(`Time calibrated with offset: ${offset}ms`);
      } catch (error) {
        console.error('Error syncing time with server:', error);
      }
    };

    calibrateTime();
  }, []);

  // Detect changes in dataSource and trigger initial fetch
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newDataSource = store.getState().dataSource.dataSource;
      if (newDataSource !== dataSourceRef.current) {
        dataSourceRef.current = newDataSource;
        isInitialFetch.current = true;
        fetchAndProcessTrends();
      }
    });

    return () => unsubscribe();
  }, [fetchAndProcessTrends]);

  // Periodic delta updates
  useEffect(() => {
    fetchAndProcessTrends();
    const intervalId = setInterval(fetchAndProcessTrends, DATA_FETCH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [fetchAndProcessTrends]);

  return (
    <TrendsApiContext.Provider value={{ numData, setNumData, usNumData, setUsNumData }}>
      {children}
    </TrendsApiContext.Provider>
  );
};

export const useTrends = (): TrendsContextProps => {
  const context = useContext(TrendsApiContext);
  if (!context) {
    throw new Error('useTrends must be used within a TrendsApiProvider');
  }
  return context;
};