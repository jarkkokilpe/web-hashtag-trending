import { Module } from '@nestjs/common';
import { RandService } from './randomizer.service';
import { RandController } from './randomizer.controller';

@Module({
  providers: [RandService],
  controllers: [RandController],
  exports: [RandService],
})
export class RandModule {}
