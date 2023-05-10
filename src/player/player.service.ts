import { Injectable, Logger } from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import PlayerRepository from './domain/repositories/player.repository';
import Player from './domain/entities/player.interface';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(readonly playerRepository: PlayerRepository) {}

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.getAll();
  }

  async createUpdatePlayer(createPlayer: CreatePlayerDto): Promise<any> {
    this.logger.log(`createUpdate: ${JSON.stringify(createPlayer)}`);
    return await this.playerRepository.create(createPlayer);
  }
}
