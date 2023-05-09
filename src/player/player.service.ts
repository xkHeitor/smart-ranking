import { Injectable, Logger } from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import PlayerRepository from './domain/repositories/player.repository';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(readonly playerRepository: PlayerRepository) {}

  async createUpdate(createPlayer: CreatePlayerDto): Promise<any> {
    this.logger.log(`createUpdate: ${JSON.stringify(createPlayer)}`);
    return await this.playerRepository.create(createPlayer);
  }
}
