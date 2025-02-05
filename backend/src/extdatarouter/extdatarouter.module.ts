import { Module } from '@nestjs/common';
import { XapiModule } from '../extdata/xapi/xapi.module';
import { MockModule } from '../extdata/mock/mock.module';
import { ExtDataRouterService } from './extdatarouter.service';

@Module({
  imports: [XapiModule, MockModule],
  providers: [ExtDataRouterService],
  exports: [ExtDataRouterService],
})
export class ExtDataRouterModule {}
