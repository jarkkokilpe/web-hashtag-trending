import { Controller, Get } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { Trend } from './interfaces/trend.interface';

@Controller('trends')
export class TrendsController {
  constructor(private trendsSvc: TrendsService) {}

  @Get('all')
  getTrends(): Trend[] {
    return this.trendsSvc.findAll();
  }

  @Get('single')
  getTrend(): Trend {
    return this.trendsSvc.findOne();
  }
}
