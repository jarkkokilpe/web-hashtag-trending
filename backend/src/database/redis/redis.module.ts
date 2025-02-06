import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class CustomRedisModule {}
