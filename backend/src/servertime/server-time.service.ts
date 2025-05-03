import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerTimeService {
  getServerTime(): { timestamp: number } {
    return { timestamp: Date.now() }; // Returns Unix timestamp in milliseconds
  }
}
