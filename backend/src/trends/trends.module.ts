import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { ExtDataRouterModule } from '../extdatarouter/extdatarouter.module';
import { DatabaseModule } from '../database/database.module';
import { RandModule } from 'src/randomizer/randomizer.module';

@Module({
  imports: [HttpModule, ExtDataRouterModule, DatabaseModule, RandModule],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {}
