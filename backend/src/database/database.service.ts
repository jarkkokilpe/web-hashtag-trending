import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RedisCacheService {
  private readonly redisClient: ReturnType<RedisService['getClient']>;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async storeCycle(cycleId: string, data: any): Promise<void> {
    await this.redisClient.set(cycleId, JSON.stringify(data));
  }

  async getCycle(cycleId: string): Promise<any> {
    const data: string | null = await this.redisClient.get(cycleId);
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  }

  async deleteCycle(cycleId: string): Promise<void> {
    await this.redisClient.del(cycleId);
  }

  async getAllCycles(): Promise<any[]> {
    const keys = await this.redisClient.keys('*');
    const cycles = await Promise.all(keys.map((key) => this.getCycle(key)));
    return cycles;
  }
}
