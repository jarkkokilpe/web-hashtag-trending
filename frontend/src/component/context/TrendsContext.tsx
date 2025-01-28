import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllTrends } from '../../utils/apidata';
import { numData as initialNumData  } from '../../data/countryinfo';
import { CountryInfo, TrendObj  } from '../../types/interfaces';

interface TrendsContextProps {
  numData: CountryInfo[];
  setNumData: React.Dispatch<React.SetStateAction<CountryInfo[]>>;
}

const TrendsContext = createContext<TrendsContextProps | undefined>(undefined);

interface TrendsProviderProps {
  children: React.ReactNode;
}

export const TrendsProvider: React.FC<TrendsProviderProps> = ({ children }) => {
  const [numData, setNumData] = useState<CountryInfo[]>(initialNumData);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const trends = await fetchAllTrends();
        setNumData(prevNumData => {
          return prevNumData.map((countryInfo: CountryInfo) => {
            const trendData = trends.find((trend: { woeid: number }) => trend.woeid === countryInfo.woeid);
            if (trendData) {
              const totalTweetVolume = trendData.trends.reduce((sum: number, trend: TrendObj) => sum + trend.tweet_volume, 0);
              return {
                ...countryInfo,
                trends: trendData.trends.map((trend: TrendObj) => ({
                  name: trend.name,
                  tweet_volume: trend.tweet_volume,
                })),
                hashtag: {
                  hashstr: '-',
                  count: totalTweetVolume,
                },
              };
            }
            return countryInfo;
          });
        });
        
        console.log('update trendData');
      } catch (error) {
        console.error('Error fetching trends:', error);
      }
    }, 1000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TrendsContext.Provider value={{ numData, setNumData }}>
      {children}
    </TrendsContext.Provider>
  );
};

export const useTrends = (): TrendsContextProps => {
  const context = useContext(TrendsContext);
  if (!context) {
    throw new Error('useTrends must be used within a TrendsProvider');
  }
  return context;
};