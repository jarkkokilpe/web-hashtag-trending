export interface MockTrendObj {
  woeid: number;
  trends: MockTrendContent[];
}

export interface MockTrendContent {
  name: string;
  tweet_volume: number;
}
