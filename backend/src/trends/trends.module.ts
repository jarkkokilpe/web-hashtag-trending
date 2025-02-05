import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { ExtDataRouterModule } from '../extdatarouter/extdatarouter.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    HttpModule,
    ExtDataRouterModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: 'redis://localhost:6379',
      }),
    }),
  ],
  controllers: [TrendsController],
  providers: [TrendsService],
})
export class TrendsModule {}
