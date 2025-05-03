import { Module } from '@nestjs/common';
import { ServerTimeService } from './server-time.service';
import { ServerTimeController } from './server-time.controller';

@Module({
  providers: [ServerTimeService],
  controllers: [ServerTimeController],
})
export class ServerTimeModule {}
