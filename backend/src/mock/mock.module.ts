import { Module } from '@nestjs/common';
import { MockDataService } from './mock.service';
import { RandModule } from 'src/randomizer/randomizer.module'; // Import the module, not the service
import { MockDataApiService } from './mock-api.service';
import { MockDataController } from './mock.controller';

@Module({
  imports: [RandModule],
  controllers: [MockDataController],
  providers: [MockDataService, MockDataApiService],
  exports: [MockDataService],
})
export class MockDataModule {}
