import { Injectable } from '@nestjs/common';
import { MockTrendObj } from './interfaces/mock.interface';
import { mockDataCountry } from './data/mocktrends';

@Injectable()
export class MockService {
  fetchDataByWoeId(woeid: number): Promise<MockTrendObj | undefined> {
    console.log('MOCK: fetchDataByWoeId woeid: ', woeid);
    try {
      return Promise.resolve(
        mockDataCountry.find((trend: MockTrendObj) => trend.woeid === woeid),
      );
    } catch (error) {
      console.error('MOCK: Error fetching data from API:', error);
      return Promise.resolve(undefined);
    }
  }
}
