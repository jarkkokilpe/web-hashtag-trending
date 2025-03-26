import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TrendsService } from './trends.service';
// import { RedditService } from '../extdata/reddit/reddit.service';
import { TrendObjApi } from './interfaces/trend.interface';

@Controller('trends')
export class TrendsController {
  constructor(
    private trendsService: TrendsService,
    // private redditService: RedditService,
  ) {}

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

  /*
  @Get('redditsingle/:subreddits')
  getSingleSubreddit(@Param('subreddits') subreddits: string): any {
    try {
      console.log('redditsingle: ', subreddits);
      // Ensure subreddits is always an array
      const subredditArray = subreddits.includes(',')
        ? subreddits.split(',')
        : [subreddits];
      return this.redditService.getSubredditVolume(subredditArray);
    } catch (error: any) {
      console.log('redditsingle: error', error);
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('redditsinglebywoeid/:woeid')
  getSingleSubredditByWoeid(@Param('woeid') woeid: number): any {
    try {
      console.log('redditsingle: ', woeid);
      return this.redditService.getSubredditVolumeByWoeid(woeid);
    } catch (error: any) {
      console.log('redditsingle: error', error);
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('redditsinglenext')
  getNextSubreddit(): any {
    try {
      console.log('redditsinglenext');
      return this.redditService.fetchNextData();
    } catch (error: any) {
      console.log('redditsinglenext: error', error);
      throw new HttpException(
        (error as { message: string }).message,
        HttpStatus.NOT_FOUND,
      );
    }
  } */
}
