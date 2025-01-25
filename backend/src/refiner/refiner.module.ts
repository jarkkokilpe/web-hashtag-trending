import { Module } from '@nestjs/common';
import { XapiModule } from '../extdata/xapi/xapi.module';
import { RefinerService } from './refiner.service';

@Module({
  imports: [XapiModule],
  providers: [RefinerService],
  exports: [RefinerService],
})
export class RefinerModule {}
