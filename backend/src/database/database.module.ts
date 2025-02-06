import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CustomRedisModule } from './redis/redis.module';

@Module({
  imports: [CustomRedisModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
