import { Injectable } from '@nestjs/common';
import { XapiService } from '../extdata/xapi/xapi.service';
import { MockService } from '../extdata/mock/mock.service';
import { TrendObj } from '../trends/interfaces/trend.interface';
//import { XApiTrendObj } from '../extdata/xapi/interfaces/xapi.interface';
import { MockTrendObj } from '../extdata/mock/interfaces/mock.interface';

@Injectable()
export class RefinerService {
  constructor(
    private readonly xapiService: XapiService,
    private readonly mockService: MockService,
  ) {}

  async getRefinedTrends(woeid: number) {
    /*const trends: XApiTrendObj | undefined =
      await this.xapiService.fetchDataByWoeId(woeid);
    if (!trends) {
      throw new Error('No trends data found');
    }*/

    const trends: MockTrendObj | undefined =
      await this.mockService.fetchDataByWoeId(woeid);
    if (!trends) {
      throw new Error('No trends data found');
    }
    //const trends = await this.xapiService.fetchTrendsByWoeid(woeid);
    //this.t = { woeid: 123, trends: [{ name: 'asd', tweet_volume: 12345 }] };
    // Refine and adapt the data as needed
    /*return trends.map((trend: TrendObj) => ({
      name: trend.name,
      volume: trend.tweet_volume,
    })) as TrendObj;*/
    return trends as TrendObj;
  }
}
