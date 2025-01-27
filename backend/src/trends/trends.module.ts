import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { RefinerModule } from 'src/refiner/refiner.module';

@Module({
  imports: [HttpModule, RefinerModule],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {}
