import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrendObjApi, TrendObjExtApi } from '../_utils/interfaces';
import { RedditApiService } from './reddit-api.service';
// import { DatabaseService } from '../database/database.service';
import {
  REDDIT_API_FETCH_INTERVAL_MS,
  REDDIT_API_IN_USE,
} from '../_utils/constants';

@Injectable()
export class RedditService {
  private intervalId: NodeJS.Timeout;
  private isUpdating: boolean = false;
  // private trendCycle: number = 0;
  private readonly trendCache: TrendObjApi[] = [];

  constructor(
    private readonly redditApiService: RedditApiService,
    // private readonly redisService: DatabaseService,
  ) {
    if (REDDIT_API_IN_USE) {
      this.startFetchingData();
    }
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /* private storeTrendCycle() {
    const cycleId = `cycle:${this.trendCycle++}`; // Replace with actual cycle ID
    const data = this.trendCache;
    void this.redisService
      .cacheData(cycleId, JSON.stringify(data))
      .catch((error) => {
        console.error('Error storing trend cycle: ', error);
      });
  } */

  private updateTrendCache(trendObj: TrendObjApi) {
    if (this.isUpdating) {
      return;
    }
    try {
      const ix = this.trendCache.findIndex(
        (trend) => trend.woeid === trendObj.woeid,
      );
      if (ix !== -1) {
        trendObj.totalvolumePrev = this.trendCache[ix].totalvolume;
        trendObj.diff2 = trendObj.totalvolume - this.trendCache[ix].totalvolume;
        this.trendCache[ix] = trendObj;
      } else {
        this.trendCache.push(trendObj);
      }
      //console.log('Current data: ', this.trendCache);
    } catch (error) {
      console.error('Error fetching refined trends: ', error);
    } finally {
      this.isUpdating = false;
    }
  }

  private async fetchAndProcessTrend() {
    try {
      const nextTrend = await this.redditApiService.fetchNextData();
      if (!nextTrend) {
        throw new Error('nextTrend is undefined');
      }
      const convertedTrendApiObj = this.fitExtApiObjToApi(nextTrend);
      console.log(
        'REDDIT fetchAndProcessTrend: ',
        convertedTrendApiObj.woeid,
        convertedTrendApiObj.trends[0].name,
        convertedTrendApiObj.trends[0].tweet_volume,
      );
      //console.log(JSON.stringify(convertedTrendApiObj, null, 2));
      this.updateTrendCache(convertedTrendApiObj);
      if (this.redditApiService.isCycleDone()) {
        this.redditApiService.resetCycleDone();
      }
    } catch (error) {
      console.error('Error fetching or updating trends: ', error);
    }
  }

  private fitExtApiObjToApi(extApiObj: TrendObjExtApi): TrendObjApi {
    const apiobj: TrendObjApi = {
      ...extApiObj,
      totalvolumePrev: 0,
      totalvolume: extApiObj.trends.reduce(
        (sum, trend) => sum + trend.tweet_volume,
        0,
      ),
      diff2: 0,
      diff3: 0,
      diff5: 0,
      diff10: 0,
      subscriptions: extApiObj.subscriptions,
    };

    return apiobj;
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      void this.fetchAndProcessTrend();
    }, REDDIT_API_FETCH_INTERVAL_MS);
  }

  fetchAll(): TrendObjApi[] {
    return this.trendCache;
  }

  findOneByWoeid(woeid: number): TrendObjApi {
    console.log('woeId to search: ', woeid);
    const trend = this.trendCache.find(
      (trend: TrendObjApi) => trend.woeid == woeid,
    );
    if (!trend) {
      throw new HttpException(
        `Trend with woeid ${woeid} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return trend;
  }
}
