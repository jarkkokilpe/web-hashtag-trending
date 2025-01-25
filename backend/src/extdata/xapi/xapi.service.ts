import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { XApiTrendObj } from './interfaces/xapi.interface';

@Injectable()
export class XapiService {
  constructor(private readonly httpService: HttpService) {}

  async fetchDataByWoeId(woeid: number): Promise<XApiTrendObj | undefined> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://api.x.com/2/trends/by/woeid/${woeid}`, {
          headers: {
            Authorization: 'Bearer XXXXX',
          },
        }),
      );
      const data: XApiTrendObj = response.data as XApiTrendObj;
      console.log('XAPI: fetchTrendsByWoeid ', data);
      return data;
    } catch (error) {
      console.error('XAPI: Error fetching data from API:', error);
      return undefined;
    }
  }
}
