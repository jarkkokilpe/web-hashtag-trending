import { Module } from '@nestjs/common';
import { MockDataService } from './mock.service';

@Module({
  providers: [MockDataService],
  exports: [MockDataService],
})
export class MockDataModule {}
