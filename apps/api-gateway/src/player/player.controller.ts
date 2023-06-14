import { Controller } from '@nestjs/common';
import { Queue } from '@queue';

@Controller('api/v1')
export class PlayerController {
  constructor(readonly queue: Queue) {}
}
