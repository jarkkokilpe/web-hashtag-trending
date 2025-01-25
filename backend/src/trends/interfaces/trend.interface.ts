export interface TrendObj {
  woeid: number;
  trends: TrendContent[];
}

export interface TrendContent {
  name: string;
  tweet_volume: number;
}
