import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TrendObjApi, TrendObjExtApi } from '../_utils/interfaces';
// import { DatabaseService } from '../database/database.service';
import { XAPI_API_FETCH_INTERVAL_MS, XAPI_IN_USE } from '../_utils/constants';
import { XdataApiService } from './xdata-api.services';

@Injectable()
export class XdataService {
  private readonly logger = new Logger(XdataService.name);
  private intervalId: NodeJS.Timeout;
  private isUpdating: boolean = false;
  // private trendCycle: number = 0;
  private readonly trendCache: TrendObjApi[] = [];

  constructor(
    private readonly xdataApiService: XdataApiService,
    // private readonly redisService: DatabaseService,
  ) {
    if (XAPI_IN_USE) {
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
      //this.logger.log('Current data: ', this.trendCache);
    } catch (error) {
      console.error('Error fetching refined trends: ', error);
    } finally {
      this.isUpdating = false;
    }
  }

  private async fetchAndProcessTrend() {
    try {
      this.logger.log('fetch');
      const nextTrend = await this.xdataApiService.fetchNextData();
      if (!nextTrend) {
        throw new Error('nextTrend is undefined');
      }
      const convertedTrendApiObj = this.fitExtApiObjToApi(nextTrend);
      //this.logger.log('fetchAndProcessTrend: ');
      //this.logger.log(JSON.stringify(convertedTrendApiObj, null, 2));
      this.updateTrendCache(convertedTrendApiObj);
      if (this.xdataApiService.isCycleDone()) {
        this.xdataApiService.resetCycleDone();
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
      updatedAt: Date.now(),
    };

    return apiobj;
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      void this.fetchAndProcessTrend();
    }, XAPI_API_FETCH_INTERVAL_MS);
  }

  fetchAll(): TrendObjApi[] {
    return this.trendCache;
  }

  fetchDelta(since: number): TrendObjApi[] {
    return Array.from(this.trendCache.values()).filter(
      (trend) => trend.updatedAt > since,
    );
  }

  findOneByWoeid(woeid: number): TrendObjApi {
    this.logger.log('woeId to search: ', woeid);
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
