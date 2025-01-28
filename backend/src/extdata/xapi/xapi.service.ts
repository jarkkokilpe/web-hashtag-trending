import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { XApiTrendObj } from './interfaces/xapi.interface';
import { rollingXapiWoeid } from './data/request';

@Injectable()
export class XapiService {
  private woeids = rollingXapiWoeid.map((country) => country.woeid);
  private woeidCounter = 0;

  constructor(private readonly httpService: HttpService) {}

  async fetchNextData(): Promise<XApiTrendObj | undefined> {
    try {
      const woeid = this.woeids[this.woeidCounter];
      const response = await firstValueFrom(
        this.httpService.get(`https://api.x.com/2/trends/by/woeid/${woeid}`, {
          headers: {
            Authorization: 'Bearer XXXXX',
          },
        }),
      );
      const data: XApiTrendObj = response.data as XApiTrendObj;
      this.woeidCounter = (this.woeidCounter + 1) % this.woeids.length;
      console.log('XAPI: fetchTrendsByWoeid ', data);
      return data;
    } catch (error) {
      console.error('XAPI: Error fetching data from API:', error);
      return undefined;
    }
  }
}
