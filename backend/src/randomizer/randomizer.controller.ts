import { Controller, Post } from '@nestjs/common';
import { RandService } from './randomizer.service';

@Controller('tweets')
export class RandController {
  constructor(private readonly randService: RandService) {}

  // Here is a possibility to randomize post volumes from the frontend
  @Post('randomize-volumes')
  async randomizeVolumes() {
    await this.randService.randomizePostVolumes();
    return { message: 'Post volumes randomized successfully.' };
  }
}
