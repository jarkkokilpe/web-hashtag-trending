import { Injectable } from '@nestjs/common';
import { MockTrendObj } from './interfaces/mock.interface';
import { mockDataCountry } from './data/mocktrends';

@Injectable()
export class MockService {
  private woeids = mockDataCountry.map((country) => country.woeid);
  private woeidCounter = 0;

  constructor() {}

  fetchNextData(): Promise<MockTrendObj | undefined> {
    try {
      const woeid = this.woeids[this.woeidCounter];
      console.log('MOCK: fetchDataByWoeId woeid: ', woeid);
      const trend = mockDataCountry.find(
        (trend: MockTrendObj) => trend.woeid === woeid,
      );
      this.woeidCounter = (this.woeidCounter + 1) % this.woeids.length;
      return Promise.resolve(trend);
    } catch (error) {
      console.error('MOCK: Error fetching data from API:', error);
      return Promise.resolve(undefined);
    }
  }
}
