import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrendObj } from './interfaces/trend.interface';
import { ExtDataRouterService } from '../extdatarouter/extdatarouter.service';
import { RedisCacheService } from 'src/redis/redis.service';
import { FETCH_INTERVAL_MS } from '../constants';

@Injectable()
export class TrendsService {
  private intervalId: NodeJS.Timeout;
  private isUpdating: boolean = false;
  private trendCycle: number = 0;
  private readonly trendCache: TrendObj[] = [];

  constructor(
    private readonly extRouterService: ExtDataRouterService,
    private readonly redisService: RedisCacheService,
  ) {
    this.startFetchingData();
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private storeTrendCycle() {
    const cycleId = `cycle:${this.trendCycle++}`; // Replace with actual cycle ID
    const data = this.trendCache;
    void this.redisService.storeCycle(cycleId, data).catch((error) => {
      console.error('Error storing trend cycle: ', error);
    });
  }

  private updateTrendCache(trendObj: TrendObj) {
    if (this.isUpdating) {
      return;
    }

    try {
      const existingTrendIndex = this.trendCache.findIndex(
        (trend) => trend.woeid === trendObj.woeid,
      );

      if (existingTrendIndex !== -1) {
        this.trendCache[existingTrendIndex] = trendObj;
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
      this.updateTrendCache(nextTrend);
      if (this.extRouterService.isCycleDone()) {
        //
        this.storeTrendCycle();
        this.extRouterService.resetCycleDone();
      }
    } catch (error) {
      console.error('Error fetching or updating trends: ', error);
    }
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      void this.fetchAndProcessTrend();
    }, FETCH_INTERVAL_MS);
  }

  findAll(): TrendObj[] {
    return this.trendCache;
  }

  findOneByWoeid(woeid: number): TrendObj {
    console.log('woeId to search: ', woeid);
    const trend = this.trendCache.find(
      (trend: TrendObj) => trend.woeid == woeid,
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
