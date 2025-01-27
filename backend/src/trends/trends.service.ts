import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrendObj } from './interfaces/trend.interface';
import { RefinerService } from '../refiner/refiner.service';
import { mockDataCountry } from '../extdata/mock/data/mocktrends';
import { FETCH_INTERVAL_MS } from '../constants';

@Injectable()
export class TrendsService {
  private intervalId: NodeJS.Timeout;
  private readonly trends: TrendObj[] = [];

  private woeids = mockDataCountry.map((trend) => trend.woeid);
  private readonly woeidCount = this.woeids.length;
  private woeidCounter = 0;

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

  private async fetchDataByWoeId(woeId: number) {
    try {
      const refinedTrends: TrendObj =
        await this.refinerService.getRefinedTrends(woeId);
      this.updateNewObjectToTrendsArray(refinedTrends);
    } catch (error) {
      console.error('Error fetching refined trends:', error);
    }
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      console.log(
        'Current woeid, index',
        this.woeids[this.woeidCounter],
        this.woeidCounter,
      );
      const woeid = this.woeids[this.woeidCounter];
      this.fetchDataByWoeId(woeid).catch((error) =>
        console.error('Error in fetchData:', error),
      );
      this.woeidCounter = (this.woeidCounter + 1) % this.woeidCount;
    }, FETCH_INTERVAL_MS);
  }

  create(trend: TrendObj) {
    this.trends.push(trend);
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
