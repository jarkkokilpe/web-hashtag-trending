import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MockDataService } from './mock.service';
import { TrendObjApi } from '../_utils/interfaces';

@Controller('trends/mock')
export class MockDataController {
  constructor(private readonly mockService: MockDataService) {}

  @Get('all')
  getTrends(): TrendObjApi[] {
    return this.mockService.fetchAll();
  }

  @Get('delta')
  getDelta(@Query('since') since: string): TrendObjApi[] {
    const sinceTimestamp = parseInt(since) || 0;
    return this.mockService.fetchDelta(sinceTimestamp);
  }

  @Get('single/:woeid')
  getTrend(@Param('woeid') woeid: number): TrendObjApi {
    try {
      return this.mockService.findOneByWoeid(woeid);
    } catch (error: any) {
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
