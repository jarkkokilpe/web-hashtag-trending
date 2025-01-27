import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendObj } from './interfaces/trend.interface';

@Controller('trends')
export class TrendsController {
  constructor(private trendsSvc: TrendsService) {}

  @Get('all')
  getTrends(): TrendObj[] {
    return this.trendsSvc.findAll();
  }

  @Get('single/:woeid')
  getTrend(@Param('woeid') woeid: number): TrendObj {
    try {
      return this.trendsSvc.findOneByWoeid(woeid);
    } catch (error: any) {
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
