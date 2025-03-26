import { Module } from '@nestjs/common';
import { XapiModule } from '../extdata/xapi/xapi.module';
import { MockDataModule } from '../extdata/mock/mock.module';
import { ExtDataRouterService } from './extdatarouter.service';
import { RedditModule } from 'src/extdata/reddit/reddit.module';

@Module({
  imports: [XapiModule, MockDataModule, RedditModule],
  providers: [ExtDataRouterService],
  exports: [ExtDataRouterService],
})
export class ExtDataRouterModule {}
