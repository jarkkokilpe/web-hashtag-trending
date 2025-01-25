import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTrends(): string {
    return 'Get Trends!';
  }

  getHello(): string {
    return 'Hello Worl2!';
  }
}
