import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { XapiService } from './xapi.service';

@Module({
  imports: [HttpModule],
  providers: [XapiService],
  exports: [XapiService],
})
export class XapiModule {}
