import { Module } from '@nestjs/common';
import { RedditModule } from './reddit/reddit.module';
import { XapiModule } from './xdata/xdata.module';
import { MockDataModule } from './mock/mock.module';
import { ServerTimeModule } from './servertime/server-time.module';

@Module({
  imports: [XapiModule, RedditModule, MockDataModule, ServerTimeModule],
})
export class AppModule {}
