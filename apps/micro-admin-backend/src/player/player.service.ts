import { Injectable, Logger } from '@nestjs/common';
import PlayerRepository from './repositories/player.repository';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(private readonly playerRepository: PlayerRepository) {}
}
