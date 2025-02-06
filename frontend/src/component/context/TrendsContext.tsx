import React, { 
  createContext, 
  useState, 
  useContext, 
  useEffect 
} from 'react';
import { fetchAllTrends } from '../../services/apidata';
import { numData as initialNumData  } from '../../data/countryinfo';
import { usNumData as initialUsNumData  } from '../../data/us/stateinfo';
import { CountryInfo, TrendContent, TrendApiObj  } from '../../types/interfaces';
import { DATA_FETCH_INTERVAL_MS  } from '../../config/constants';

interface TrendsContextProps {
  numData: CountryInfo[];
  setNumData: React.Dispatch<React.SetStateAction<CountryInfo[]>>;
  usNumData: CountryInfo[];
  setUsNumData: React.Dispatch<React.SetStateAction<CountryInfo[]>>;
}

interface TrendsProviderProps {
  children: React.ReactNode;
}

const TrendsContext = createContext<TrendsContextProps | undefined>(undefined);

const processTrendData = (data: CountryInfo[], trends: TrendApiObj[]): CountryInfo[] => {
  return data.map((info: CountryInfo) => {
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

export const TrendsProvider: React.FC<TrendsProviderProps> = ({ children }) => {
  const [numData, setNumData] = useState<CountryInfo[]>(initialNumData);
  const [usNumData, setUsNumData] = useState<CountryInfo[]>(initialUsNumData); // Initialize US states data

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
    <TrendsContext.Provider value={{ numData, setNumData, usNumData, setUsNumData }}>
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