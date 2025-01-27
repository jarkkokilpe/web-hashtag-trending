import { Module } from '@nestjs/common';
import { XapiModule } from '../extdata/xapi/xapi.module';
import { MockModule } from '../extdata/mock/mock.module';
import { RefinerService } from './refiner.service';

@Module({
  imports: [XapiModule, MockModule],
  providers: [RefinerService],
  exports: [RefinerService],
})
export class RefinerModule {}
