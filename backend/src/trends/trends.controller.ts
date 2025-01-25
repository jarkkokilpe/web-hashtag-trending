import { Controller, Get } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendObj } from './interfaces/trend.interface';

@Controller('trends')
export class TrendsController {
  constructor(private trendsSvc: TrendsService) {}

  @Get('all')
  getTrends(): TrendObj[] {
    return this.trendsSvc.findAll();
  }

  @Get('single')
  getTrend(): TrendObj {
    return this.trendsSvc.findOne();
  }
}
