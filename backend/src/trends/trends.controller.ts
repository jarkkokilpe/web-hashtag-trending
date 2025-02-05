import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendObjApi } from './interfaces/trend.interface';

@Controller('trends')
export class TrendsController {
  constructor(private trendsService: TrendsService) {}

  @Get('all')
  getTrends(): TrendObjApi[] {
    return this.trendsService.fetchAll();
  }

  @Get('single/:woeid')
  getTrend(@Param('woeid') woeid: number): TrendObjApi {
    try {
      return this.trendsService.findOneByWoeid(woeid);
    } catch (error: any) {
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
