import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CreatePlayerDto from './dtos/create-player.dto';
import UpdatePlayerDto from './dtos/update-player.dto';
import Player from './interfaces/player.interface';
import PlayerRepository from './repositories/player.repository';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(private readonly playerRepository: PlayerRepository) {}

  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.getAll();
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    const foundPlayer: Player = await this.playerRepository.getFindById(id);
    if (!foundPlayer) throw new NotFoundException(`Player not found`);
    return foundPlayer;
  }

  async createPlayer(playerDto: CreatePlayerDto): Promise<any> {
    return this.playerRepository.create(playerDto);
  }

  async updatePlayer(id: string, playerDto: UpdatePlayerDto): Promise<any> {
    await this.getPlayerById(id);
    return this.playerRepository.update(id, playerDto);
  }

  async deletePlayer(id: string): Promise<void> {
    await this.getPlayerById(id);
    return this.playerRepository.delete(id);
  }
}
