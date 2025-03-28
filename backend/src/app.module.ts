import { Module } from '@nestjs/common';
import { RedditModule } from './reddit/reddit.module';
import { XapiModule } from './xdata/xdata.module';
import { MockDataModule } from './mock/mock.module';

@Module({
  imports: [XapiModule, RedditModule, MockDataModule],
})
export class AppModule {}
