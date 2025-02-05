export interface TrendObjExtApi {
  woeid: number;
  trends: TrendContent[];
}

export interface TrendContent {
  name: string;
  tweet_volume: number;
}
