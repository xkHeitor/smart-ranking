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

  async createUpdatePlayer(playerDto: CreatePlayerDto): Promise<any> {
    const { email } = playerDto;
    const foundPlayer: Player = await this.playerRepository.getFindByEmail(
      email,
    );
    this.logger.log(
      `${foundPlayer ? 'update' : 'create'}: ${JSON.stringify(playerDto)}`,
    );
    if (!foundPlayer) return await this.playerRepository.create(playerDto);
    return await this.playerRepository.update(foundPlayer, playerDto);
  }
}
