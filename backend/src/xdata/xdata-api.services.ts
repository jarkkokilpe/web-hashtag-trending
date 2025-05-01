import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TrendObjExtApi } from '../_utils/interfaces';
import { rollingXapiWoeid } from './data/request';

@Injectable()
export class XdataApiService {
  private readonly logger = new Logger(XdataApiService.name);
  private woeids = rollingXapiWoeid.map((country) => country.woeid);
  private woeidCounter = 0;
  private xApiCycleDone = false;

  constructor(private readonly httpService: HttpService) {}

  async fetchNextData(): Promise<TrendObjExtApi | undefined> {
    try {
      const woeid = this.woeids[this.woeidCounter];
      this.logger.log('XAPI: fetchNextData woeid:', woeid);
      const response = await firstValueFrom(
        this.httpService.get(`https://api.x.com/2/trends/by/woeid/${woeid}`, {
          headers: {
            Authorization: `Bearer ${process.env.XAPI_KEY}`,
          },
        }),
      );
      const data: TrendObjExtApi = response.data as TrendObjExtApi;
      this.woeidCounter = (this.woeidCounter + 1) % this.woeids.length;

      if (this.woeidCounter) {
        this.xApiCycleDone = true;
      }

      this.logger.log('XAPI: fetchTrendsByWoeid ', data);
      return data;
    } catch (error) {
      this.logger.error('XAPI: Error fetching data from API:', error);
      return undefined;
    }
  }

  isCycleDone(): boolean {
    return this.xApiCycleDone;
  }

  resetCycleDone(): void {
    this.xApiCycleDone = false;
  }
}
