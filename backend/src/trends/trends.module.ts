import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { ExtDataRouterModule } from '../extdatarouter/extdatarouter.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, ExtDataRouterModule, DatabaseModule],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {}
