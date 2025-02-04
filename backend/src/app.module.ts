import { Module } from '@nestjs/common';
import { TrendsModule } from './trends/trends.module';

@Module({
  imports: [TrendsModule],
})
export class AppModule {}
