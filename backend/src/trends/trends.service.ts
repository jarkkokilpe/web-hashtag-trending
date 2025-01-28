import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrendObj } from './interfaces/trend.interface';
import { RefinerService } from '../refiner/refiner.service';
import { FETCH_INTERVAL_MS } from '../constants';

@Injectable()
export class TrendsService {
  private intervalId: NodeJS.Timeout;
  private readonly trends: TrendObj[] = [];

  constructor(private readonly refinerService: RefinerService) {}

  onModuleInit() {
    this.startFetchingData();
  }

  onModuleDestroy() {
    clearInterval(this.intervalId);
  }

  private updateNewObjectToTrendsArray(trendObj: TrendObj) {
    try {
      const existingTrendIndex = this.trends.findIndex(
        (trend) => trend.woeid === trendObj.woeid,
      );

      if (existingTrendIndex !== -1) {
        this.trends[existingTrendIndex] = trendObj;
      } else {
        this.trends.push(trendObj);
      }

      console.log('Current data:', this.trends);
    } catch (error) {
      console.error('Error fetching refined trends:', error);
    }
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      console.log('fetch');
      this.refinerService
        .getNextTrend()
        .then((nextTrend) => {
          this.updateNewObjectToTrendsArray(nextTrend);
        })
        .catch((error) => {
          console.error('Error fetching refined trends:', error);
        });
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
