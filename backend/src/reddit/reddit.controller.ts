import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RedditService } from './reddit.service';
import { TrendObjApi } from 'src/_utils/interfaces';

@Controller('trends/reddit')
export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  @Get('all')
  getTrends(): TrendObjApi[] {
    return this.redditService.fetchAll();
  }

  @Get('single/:woeid')
  getTrend(@Param('woeid') woeid: number): TrendObjApi {
    try {
      return this.redditService.findOneByWoeid(woeid);
    } catch (error: any) {
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
