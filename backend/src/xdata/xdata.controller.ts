import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { XdataService } from './xdata.service';
import { TrendObjApi } from 'src/_utils/interfaces';

@Controller('trends/xapi')
export class XdataController {
  constructor(private readonly xdataService: XdataService) {}

  @Get('all')
  getTrends(): TrendObjApi[] {
    return this.xdataService.fetchAll();
  }

  @Get('delta')
  getDelta(@Query('since') since: string): TrendObjApi[] {
    const sinceTimestamp = parseInt(since) || 0;
    return this.xdataService.fetchDelta(sinceTimestamp);
  }

  @Get('single/:woeid')
  getTrend(@Param('woeid') woeid: number): TrendObjApi {
    try {
      return this.xdataService.findOneByWoeid(woeid);
    } catch (error: any) {
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
