import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { subredditTable } from './data/subreddits';
import { Cron } from '@nestjs/schedule';
import { TrendObjExtApi } from '../../extdatarouter/interfaces/ext.interface';

@Injectable()
export class RedditService {
  private woeids = subredditTable.map((country) => country.woeid);
  private woeidCounter = 0;
  private subredditCycleDone = false;
  private token: string = process.env.REDDIT_ACCESS_TOKEN || '';
  private tokenIssuedAt: Date;

  constructor(private readonly httpService: HttpService) {
    void this.initialize();
  }

  private async initialize() {
    await this.refreshToken(); // Initial fetch
    console.log(
      `Token issued at ${this.tokenIssuedAt?.toLocaleString('en-US', { timeZone: 'Europe/Helsinki' })}`,
    );
  }

  isCycleDone(): boolean {
    return this.subredditCycleDone;
  }

  resetCycleDone(): void {
    this.subredditCycleDone = false;
  }

  async refreshToken() {
    const auth = Buffer.from(
      `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`,
    ).toString('base64');
    const url = 'https://www.reddit.com/api/v1/access_token';
    const body = `grant_type=password&username=${process.env.REDDIT_USERNAME}&password=${process.env.REDDIT_PASSWORD}`;

    const response = await firstValueFrom(
      this.httpService
        .post(url, body, {
          headers: {
            Authorization: `Basic ${auth}`,
            'User-Agent': `${process.env.REDDIT_APP_NAME}/1.0 by /u/${process.env.REDDIT_USERNAME}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .pipe(map((res) => res.data as { access_token: string })),
    );

    this.token = response.access_token;
    this.tokenIssuedAt = new Date();
    console.log(
      `Token refreshed at ${this.tokenIssuedAt.toLocaleString('en-US', {
        timeZone: 'Europe/Helsinki',
      })}`,
    );
    return this.token;
  }

  getTimeLeft(): number {
    if (!this.tokenIssuedAt) return 0;
    const expiresAt = new Date(this.tokenIssuedAt.getTime() + 86400 * 1000); // 24h
    const now = new Date();
    return Math.max(0, (expiresAt.getTime() - now.getTime()) / 1000); // Seconds left
  }

  async getSubredditVolume(subreddits: string[], limit = 5) {
    console.log('+getSubredditVolume', subreddits);
    if (!this.token) await this.refreshToken();
    let url: string;
    if (subreddits[0] === 'USA') {
      url = `https://oauth.reddit.com/r/alabama+alaska+arizona+arkansas+california+colorado+connecticut+delaware+florida+georgia+hawaii+idaho+illinois+indiana+iowa+kansas+kentucky+louisiana+maine+maryland+massachusetts+michigan+minnesota+mississippi+missouri+montana+nebraska+nevada+newhampshire+newjersey+newmexico+newyork+northcarolina+northdakota+ohio+oklahoma+oregon+pennsylvania+rhodeisland+southcarolina+southdakota+tennessee+texas+utah+vermont+virginia+washington+westvirginia+wisconsin+wyoming/top?t=day&limit=${limit}`;
    } else {
      url = `https://oauth.reddit.com/r/${subreddits.join('+')}/top?t=day&limit=${limit}`;
    }
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'User-Agent': `${process.env.REDDIT_APP_NAME}/1.0 by /u/${process.env.REDDIT_USERNAME}`,
    };

    const response = await firstValueFrom(
      this.httpService
        .get<{
          data: {
            children: {
              data: {
                subreddit: string;
                score: number;
                title: string;
                permalink: string;
                subreddit_subscribers: string;
              };
            }[];
          };
        }>(url, { headers })
        .pipe(map((res) => res.data)),
    );

    const volumes = subreddits.map(() => {
      const posts = response?.data?.children?.slice(0, limit) || []; // Top <limit> posts directly
      const volume = posts.reduce(
        (sum: number, post: { data: { score: number } }): number =>
          sum + post.data.score,
        0,
      );
      const trends = posts.map((post) => ({
        name:
          subreddits[0] === 'USA'
            ? `${post.data.subreddit.toUpperCase()}: ${post.data.title}`
            : post.data.title,
        tweet_volume: post.data.score,
        link: `https://reddit.com${post.data.permalink}`,
      }));

      const subscriptions =
        subreddits[0] === 'USA'
          ? '5000000' // Fixed value for USA
          : posts[0]?.data?.subreddit_subscribers || '0'; // Fallback to '0' if no data

      console.log('subreddits.map');
      return { subscriptions, volume, trends };
    });

    return volumes;
  }

  async getSubredditVolumeByWoeid(woeid: number | string, limit = 5) {
    const numWoeid = typeof woeid === 'string' ? parseInt(woeid, 10) : woeid;
    const result = subredditTable.find((entry) => entry.woeid === numWoeid);

    if (!result) {
      throw new Error('Invalid WOEID');
    }

    console.log('getSubredditVolumeByWoeid:', result);
    if (!result.area) {
      throw new Error('Invalid area');
    }

    return this.getSubredditVolume([result.area], limit);
  }

  async fetchNextData(): Promise<TrendObjExtApi | undefined> {
    try {
      const woeid = this.woeids[this.woeidCounter];
      const response = await this.getSubredditVolumeByWoeid(woeid).catch(
        (error) => {
          console.error('Error in getSubredditVolumeByWoeid:', error);
          return undefined;
        },
      );

      this.woeidCounter = (this.woeidCounter + 1) % this.woeids.length;

      if (!response) {
        throw new Error('Failed to fetch subreddit volume by WOEID');
      }

      if (this.woeidCounter) {
        this.subredditCycleDone = true;
      }

      return response.length > 0
        ? {
            woeid: woeid,
            subscriptions: Number(response[0]?.subscriptions) || 0,
            trends: response.flatMap((item) =>
              item.trends.map((trend) => ({
                name: trend.name,
                tweet_volume: trend.tweet_volume,
                link: trend.link,
              })),
            ),
          }
        : undefined;
    } catch (error) {
      console.error('XAPI: Error fetching data from API:', error);
      return undefined;
    }
  }

  private checkUsa(woeid: number) {
    if (woeid === 23424977) {
      return 'USA';
    }
    return woeid;
  }

  @Cron('0 0 0,6,12,18 * * *') // Every 6 hours
  async handleTokenRefresh() {
    await this.refreshToken();
    console.log(
      `Scheduled refresh at ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Helsinki' })}`,
    );
  }
}
