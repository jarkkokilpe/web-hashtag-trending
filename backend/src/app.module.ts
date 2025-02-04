import { Module } from '@nestjs/common';
import { TrendsModule } from './trends/trends.module';
import { RedisService } from './redis/redis.service';
import { RedisController } from './redis/redis.controller';

@Module({
  imports: [TrendsModule],
  providers: [RedisService],
  controllers: [RedisController],
})
export class AppModule {}
