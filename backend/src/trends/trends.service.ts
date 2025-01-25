import { Injectable } from '@nestjs/common';
import { TrendObj } from './interfaces/trend.interface';
import { RefinerService } from '../refiner/refiner.service';

@Injectable()
export class TrendsService {
  private intervalId: NodeJS.Timeout;
  private readonly trends: TrendObj[] = [];
  private t: TrendObj;
  private s: TrendObj;

  constructor(private readonly refinerService: RefinerService) {
    //this.t = { woeid: 123, trends: [{ name: 'asd', tweet_volume: 12345 }] };
    //this.s = { woeid: 456, trends: [{ name: 'qwe', tweet_volume: 54321 }] };
    //this.create(this.s);
    //this.create(this.t);
  }

  onModuleInit() {
    this.startFetchingData();
  }

  onModuleDestroy() {
    clearInterval(this.intervalId);
  }

  private async fetchDataByWoeId(woeId: number) {
    try {
      const refinedTrends: TrendObj =
        await this.refinerService.getRefinedTrends(woeId);
      this.trends.push(refinedTrends);
    } catch (error) {
      console.error('Error fetching refined trends:', error);
    }
  }

  private startFetchingData() {
    this.intervalId = setInterval(() => {
      /* the woeid counting */
      this.fetchDataByWoeId(26062).catch((error) =>
        console.error('Error in fetchData:', error),
      );
    }, 60000); // Fetch data every 60 seconds
  }

  create(trend: TrendObj) {
    this.trends.push(trend);
  }

  findAll(): TrendObj[] {
    return this.trends;
  }

  findOne(): TrendObj {
    return this.trends[0];
  }
}
