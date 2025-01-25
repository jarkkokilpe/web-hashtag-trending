export interface XApiTrendObj {
  woeid: number;
  trends: XApiTrendContent[];
}

export interface XApiTrendContent {
  name: string;
  tweet_volume: number;
}
