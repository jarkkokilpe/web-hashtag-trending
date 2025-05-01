import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { TrendObjExtApi } from '../_utils/interfaces';
import { readFile, watch } from 'fs';
import { join } from 'path';

@Injectable()
export class MockDataApiService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MockDataApiService.name);
  private woeids: number[] = [];
  private woeidCounter = 0;
  private mockCycleDone = false;
  private mockData: TrendObjExtApi[] = [];

  constructor() {}

  onApplicationBootstrap() {
    this.logger.log('+MOCK onApplicationBootstrap');
    const mockDataPath = join(process.cwd(), 'data/mocktrends.json');
    this.loadData(mockDataPath);
    watch(mockDataPath, () => this.loadData(mockDataPath)); // watching for changes in the mock data file...
  }

  private loadData(path: string) {
    this.logger.log('+MOCK loadData');
    readFile(path, (err, data) => {
      if (err) {
        this.logger.error('Error reading mock data:', err);
        return;
      }
      try {
        this.mockData = JSON.parse(data.toString()) as TrendObjExtApi[];
        this.woeids = this.mockData.map((country) => country.woeid);
        this.logger.log('Mock data updated');
      } catch {
        this.mockData = [];
      }
    });
  }

  async fetchNextData(): Promise<TrendObjExtApi | undefined> {
    try {
      const woeid = this.woeids[this.woeidCounter];
      this.logger.log('MOCK: fetchDataByWoeId woeid: ', woeid);
      const trend = this.mockData.find(
        (trend: TrendObjExtApi) => trend.woeid === woeid,
      );
      this.woeidCounter = (this.woeidCounter + 1) % this.woeids.length;

      if (this.woeidCounter === 0) {
        this.mockCycleDone = true;
      }

      return Promise.resolve(trend);
    } catch (error) {
      console.error('MOCK: Error fetching data from API:', error);
      return Promise.resolve(undefined);
    }
  }

  isCycleDone(): boolean {
    return this.mockCycleDone;
  }

  resetCycleDone(): void {
    this.mockCycleDone = false;
  }
}
