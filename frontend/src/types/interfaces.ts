export interface TrendObj { 
  name: string;
  tweet_volume: number;
}

export interface HashObj {
  hashstr: string;
  count: number;
}

export interface CountryInfo {
  name: string,
  code: string,
  woeid: number,
  value: number,
  totalvolume: number,
  ppd: number,  // posts per inhabitant per day
  trends: TrendObj[],
  hashtag: HashObj,
}

export interface SizeProps {
  width: number;
  height: number;
}