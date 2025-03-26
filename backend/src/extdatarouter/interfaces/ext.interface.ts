export interface TrendObjExtApi {
  woeid: number;
  subscriptions: number;
  trends: TrendContent[];
}

export interface TrendContent {
  name: string;
  tweet_volume: number;
  link: string;
}
