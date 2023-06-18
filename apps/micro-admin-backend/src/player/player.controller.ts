import { Controller, Logger } from '@nestjs/common';
import { Queue } from '@queue';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  private readonly logger = new Logger(PlayerController.name);

  constructor(
    private readonly playerService: PlayerService,
    private readonly queue: Queue,
  ) {}
}
