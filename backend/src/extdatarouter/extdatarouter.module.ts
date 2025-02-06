import { Module } from '@nestjs/common';
import { XapiModule } from '../extdata/xapi/xapi.module';
import { MockDataModule } from '../extdata/mock/mock.module';
import { ExtDataRouterService } from './extdatarouter.service';

@Module({
  imports: [XapiModule, MockDataModule],
  providers: [ExtDataRouterService],
  exports: [ExtDataRouterService],
})
export class ExtDataRouterModule {}
