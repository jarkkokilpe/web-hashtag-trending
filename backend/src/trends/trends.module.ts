import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';

@Module({
  imports: [HttpModule],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {}
