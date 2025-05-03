import { Controller, Get } from '@nestjs/common';
import { ServerTimeService } from './server-time.service';

@Controller('trends/time')
export class ServerTimeController {
  constructor(private readonly serverTimeService: ServerTimeService) {}

  @Get('sync')
  getServerTime(): { timestamp: number } {
    return this.serverTimeService.getServerTime();
  }
}
