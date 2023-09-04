import { Controller, Logger } from '@nestjs/common';
import { Queue } from '@queue';

@Controller('api/v1/challenge')
export class ChallengeController {
  private logger = new Logger(ChallengeController.name);

  constructor(private readonly queue: Queue) {}
}
