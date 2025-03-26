export interface RedditTrendObj {
  woeid: number;
  subscriptions: number;
  trends: RedditTrendContent[];
}

export interface RedditTrendContent {
  name: string;
  tweet_volume: number;
}
