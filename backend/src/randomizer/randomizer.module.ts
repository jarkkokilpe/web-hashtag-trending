import { Module } from '@nestjs/common';
import { XapiModule } from '../extdata/xapi/xapi.module';
import { MockDataModule } from '../extdata/mock/mock.module';
import { RandService } from './randomizer.service';
import { RandController } from './randomizer.controller';

@Module({
  imports: [XapiModule, MockDataModule],
  providers: [RandService],
  controllers: [RandController],
  exports: [RandService],
})
export class RandModule {}
