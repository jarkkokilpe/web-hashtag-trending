import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrendObjApi } from './interfaces/trend.interface';
import { TrendObjExtApi } from '../extdatarouter/interfaces/ext.interface';
import { ExtDataRouterService } from '../extdatarouter/extdatarouter.service';
import { RandService } from '../randomizer/randomizer.service';
// import { DatabaseService } from '../database/database.service';
import { FETCH_INTERVAL_MS } from '../_utils/constants';

@Injectable()
export class TrendsService {
  private intervalId: NodeJS.Timeout;
  private isUpdating: boolean = false;
  // private trendCycle: number = 0;
  private readonly trendCache: TrendObjApi[] = [];

  constructor(
    private readonly extRouterService: ExtDataRouterService,
    private readonly randService: RandService,
    // private readonly redisService: DatabaseService,
  ) {
    this.startFetchingData();
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
      console.log('Current data: ', this.trendCache);
    } catch (error) {
      console.error('Error fetching refined trends: ', error);
    } finally {
      this.isUpdating = false;
    }
  }

  private async fetchAndProcessTrend() {
    try {
      console.log('fetch');
      const nextTrend = await this.extRouterService.getNextTrend();
      const convertedTrendApiObj = this.fitExtApiObjToApi(nextTrend);
      this.updateTrendCache(convertedTrendApiObj);
      if (this.extRouterService.isCycleDone()) {
        await this.randService.randomizePostVolumes();
        //this.storeTrendCycle();
        this.extRouterService.resetCycleDone();
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
    };

    return apiobj;
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      void this.fetchAndProcessTrend();
    }, FETCH_INTERVAL_MS);
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
