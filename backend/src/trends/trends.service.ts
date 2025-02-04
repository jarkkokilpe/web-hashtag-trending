import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrendObj } from './interfaces/trend.interface';
import { RefinerService } from '../refiner/refiner.service';
import { RedisCacheService } from 'src/redis/redis.service';
import { FETCH_INTERVAL_MS } from '../constants';

@Injectable()
export class TrendsService {
  private intervalId: NodeJS.Timeout;
  private isUpdating: boolean = false;
  private readonly trends: TrendObj[] = [];

  constructor(
    private readonly refinerService: RefinerService,
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
    const cycleId = 'someCycleId'; // Replace with actual cycle ID
    const data = this.trends;
    void this.redisService.storeCycle(cycleId, data).catch((error) => {
      console.error('Error storing cycle: ', error);
    });
  }

  private updateNewObjectToTrendsArray(trendObj: TrendObj) {
    if (this.isUpdating) {
      return;
    }

    try {
      const existingTrendIndex = this.trends.findIndex(
        (trend) => trend.woeid === trendObj.woeid,
      );

      if (existingTrendIndex !== -1) {
        this.trends[existingTrendIndex] = trendObj;
      } else {
        this.trends.push(trendObj);
      }

      console.log('Current data: ', this.trends);
    } catch (error) {
      console.error('Error fetching refined trends: ', error);
    } finally {
      this.isUpdating = false;
    }
  }

  private async fetchAndUpdateTrend() {
    try {
      console.log('fetch');
      const nextTrend = await this.refinerService.getNextTrend();
      this.updateNewObjectToTrendsArray(nextTrend);
      if (this.refinerService.isCycleDone()) {
        //
        this.storeTrendCycle();
        this.refinerService.resetCycleDone();
      }
    } catch (error) {
      console.error('Error fetching or updating trends: ', error);
    }
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      void this.fetchAndUpdateTrend();
    }, FETCH_INTERVAL_MS);
  }

  findAll(): TrendObj[] {
    return this.trends;
  }

  findOneByWoeid(woeid: number): TrendObj {
    console.log('woeId to search: ', woeid);
    const trend = this.trends.find((trend: TrendObj) => trend.woeid == woeid);
    if (!trend) {
      throw new HttpException(
        `Trend with woeid ${woeid} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return trend;
  }
}
