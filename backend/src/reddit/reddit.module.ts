import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RedditService } from './reddit.service';
import { RedditApiService } from './reddit-api.service';
import { RedditController } from './reddit.controller';

@Module({
  imports: [HttpModule],
  controllers: [RedditController],
  providers: [RedditService, RedditApiService],
  exports: [RedditService],
})
export class RedditModule {}
