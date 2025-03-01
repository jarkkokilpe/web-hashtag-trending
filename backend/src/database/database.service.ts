import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly redisService: RedisService) {}

  async cacheData(key: string, value: string): Promise<void> {
    await this.redisService.set(key, value);
  }

  async getCachedData(key: string): Promise<string | null> {
    return this.redisService.get(key);
  }
}
