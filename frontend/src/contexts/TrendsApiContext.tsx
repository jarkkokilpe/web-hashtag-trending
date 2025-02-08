import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllTrends } from '../services/apidata';
import { numData as initialNumData  } from '../data/countryinfo';
import { usNumData as initialUsNumData  } from '../data/us/stateinfo';
import { AreaData, TrendContent, TrendApiObj  } from '../types/interfaces';
import { DATA_FETCH_INTERVAL_MS  } from '../config/constants';

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
    const trendData = trends.find((trend: { woeid: number }) => trend.woeid === info.woeid);
    if (trendData) {
      const topTrend = trendData.trends.reduce((prev: TrendContent, current: TrendContent) => (current.tweet_volume > prev.tweet_volume ? current : prev), trendData.trends[0]);
      return {
        ...info,
        trends: trendData.trends.map((trend: TrendContent) => ({
          name: trend.name,
          tweet_volume: trend.tweet_volume,
        })),
        totalvolume: trendData.totalvolume,
        totalvolumePrev: trendData.totalvolumePrev,
        diff2: trendData.diff2,
        diff3: trendData.diff3,
        diff5: trendData.diff5,
        diff10: trendData.diff10,
        hashtag: {
          hashstr: topTrend.name,
          count: topTrend.tweet_volume,
        },
      };
    }
    return info;
  });
};

export const TrendsApiProvider: React.FC<TrendsProviderProps> = ({ children }) => {
  const [numData, setNumData] = useState<AreaData[]>(initialNumData);
  const [usNumData, setUsNumData] = useState<AreaData[]>(initialUsNumData); // Initialize US states data

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const trends = await fetchAllTrends();
        setNumData(prevNumData => processTrendData(prevNumData, trends));
        setUsNumData(prevUsNumData => processTrendData(prevUsNumData, trends));
        
        //console.log('update trendData');
      } catch (error) {
        console.error('Error fetching trends:', error);
      }
    }, DATA_FETCH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

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