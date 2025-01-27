import { Injectable } from '@nestjs/common';
import { XapiService } from '../extdata/xapi/xapi.service';
import { MockService } from '../extdata/mock/mock.service';
import { TrendObj } from '../trends/interfaces/trend.interface';
import {
  FETCH_INTERVAL_MS,
  XAPI_IN_USE,
  XAPI_RATE_LIMIT,
  XAPI_RATE_LIMIT_WINDOW_MS,
} from '../constants';

@Injectable()
export class RefinerService {
  constructor(
    private readonly xapiService: XapiService,
    private readonly mockService: MockService,
  ) {}

  async getRefinedTrends(woeid: number) {
    let trendObj: TrendObj | undefined;

    if (XAPI_IN_USE) {
      if (FETCH_INTERVAL_MS < XAPI_RATE_LIMIT_WINDOW_MS / XAPI_RATE_LIMIT) {
        throw new Error(
          'Fetch interval is too low - may exceed XAPI rate limits.',
        );
      }
      trendObj = await this.xapiService.fetchDataByWoeId(woeid);
      if (!trendObj) {
        throw new Error('No trend data found from XAPI');
      }
    } else {
      trendObj = await this.mockService.fetchDataByWoeId(woeid);
      if (!trendObj) {
        throw new Error('No trends data found from MOCK data');
      }
    }

    return trendObj;
  }
}
