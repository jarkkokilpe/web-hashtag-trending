import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MockService } from './mock.service';

@Module({
  imports: [HttpModule],
  providers: [MockService],
  exports: [MockService],
})
export class XapiModule {}
