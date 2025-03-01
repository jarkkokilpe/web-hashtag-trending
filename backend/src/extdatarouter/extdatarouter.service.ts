import { Injectable } from '@nestjs/common';
import { XapiService } from '../extdata/xapi/xapi.service';
import { MockDataService } from '../extdata/mock/mock.service';
import { TrendObjExtApi } from './interfaces/ext.interface';
import {
  FETCH_INTERVAL_MS,
  XAPI_IN_USE,
  XAPI_RATE_LIMIT,
  XAPI_RATE_LIMIT_WINDOW_MS,
} from '../_utils/constants';

@Injectable()
export class ExtDataRouterService {
  constructor(
    private readonly xapiService: XapiService,
    private readonly mockService: MockDataService,
  ) {}

  async getNextTrend() {
    let trendObj: TrendObjExtApi | undefined;

    if (XAPI_IN_USE) {
      // rate limiting guard - ADJUST FOR YOUR USE CASE
      if (FETCH_INTERVAL_MS < XAPI_RATE_LIMIT_WINDOW_MS / XAPI_RATE_LIMIT) {
        throw new Error(
          'Fetch interval is too low - may exceed XAPI rate limits.',
        );
      }
      trendObj = await this.xapiService.fetchNextData();
      if (!trendObj) {
        throw new Error('No trend data found from XAPI');
      }
    } else {
      trendObj = await this.mockService.fetchNextData();
      if (!trendObj) {
        throw new Error('No trend data found from MOCK data');
      }
    }

    return trendObj;
  }

  isCycleDone(): boolean {
    if (XAPI_IN_USE) {
      return this.xapiService.isCycleDone();
    } else {
      return this.mockService.isCycleDone();
    }
  }

  resetCycleDone(): void {
    if (XAPI_IN_USE) {
      this.xapiService.resetCycleDone();
    } else {
      this.mockService.resetCycleDone();
    }
  }
}
