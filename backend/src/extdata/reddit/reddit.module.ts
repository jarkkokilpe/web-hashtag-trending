import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RedditService } from './reddit.service';

@Module({
  imports: [HttpModule],
  providers: [RedditService],
  exports: [RedditService],
})
export class RedditModule {}
