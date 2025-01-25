import { Injectable } from '@nestjs/common';
import { Trend } from './interfaces/trend.interface';

@Injectable()
export class TrendsService {
  private readonly trends: Trend[] = [];
  private t: Trend;
  private s: Trend;

  constructor() {
    this.t = { woeid: 123, trend: 'asd', count: 2324 };
    this.s = { woeid: 245, trend: 'def', count: 54657 };

    this.create(this.s);
    this.create(this.t);
  }

  create(trend: Trend) {
    this.trends.push(trend);
  }

  findAll(): Trend[] {
    return this.trends;
  }

  findOne(): Trend {
    return this.trends[0];
  }
}
