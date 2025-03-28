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

export interface TrendObjApi extends TrendObjExtApi {
  totalvolume: number;
  totalvolumePrev: number;
  diff2: number;
  diff3: number;
  diff5: number;
  diff10: number;
  subscriptions: number;
}
