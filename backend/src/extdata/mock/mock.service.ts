import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MockTrendObj } from './interfaces/mock.interface';
import { readFile, watch } from 'fs';
import { join } from 'path';

@Injectable()
export class MockDataService implements OnApplicationBootstrap {
  private woeids: number[] = [];
  private woeidCounter = 0;
  private mockCycleDone = false;
  private mockData: MockTrendObj[] = [];

  constructor() {}

  onApplicationBootstrap() {
    console.log('+MOCK onApplicationBootstrap');
    const mockDataPath = join(process.cwd(), 'data/mocktrends.json');
    this.loadData(mockDataPath);
    watch(mockDataPath, () => this.loadData(mockDataPath));
  }

  private loadData(path: string) {
    console.log('+MOCK loadData');
    readFile(path, (err, data) => {
      if (err) {
        console.error('Error reading mock data:', err);
        return;
      }
      try {
        this.mockData = JSON.parse(data.toString()) as MockTrendObj[];
        this.woeids = this.mockData.map((country) => country.woeid);
        console.log('Mock data updated');
      } catch {
        this.mockData = [];
      }
    });
  }

  fetchNextData(): Promise<MockTrendObj | undefined> {
    try {
      const woeid = this.woeids[this.woeidCounter];
      console.log('MOCK: fetchDataByWoeId woeid: ', woeid);
      const trend = this.mockData.find(
        (trend: MockTrendObj) => trend.woeid === woeid,
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

/*import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile, watch } from 'fs';
import { join } from 'path';

@Injectable()
export class MockDataService implements OnApplicationBootstrap {
  private mockData: any[] = [];

  onApplicationBootstrap() {
    const mockDataPath = join(__dirname, '../../data/mockData.json');
    this.loadData(mockDataPath);
    watch(mockDataPath, () => this.loadData(mockDataPath));
  }

  private loadData(path: string) {
    readFile(path, (err, data) => {
      if (err) {
        console.error('Error reading mock data:', err);
        return;
      }
      this.mockData = JSON.parse(data.toString());
      console.log('Mock data updated');
    });
  }

  getMockData() {
    return this.mockData;
  }
}*/
