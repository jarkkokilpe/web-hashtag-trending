import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { XdataService } from './xdata.service';
import { XdataApiService } from './xdata-api.services';
import { XdataController } from './xdata.controller';

@Module({
  imports: [HttpModule],
  controllers: [XdataController],
  providers: [XdataService, XdataApiService],
  exports: [XdataService],
})
export class XapiModule {}
