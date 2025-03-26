export interface XApiTrendObj {
  woeid: number;
  subscriptions: number;
  trends: XApiTrendContent[];
}

export interface XApiTrendContent {
  name: string;
  tweet_volume: number;
}
