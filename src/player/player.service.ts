import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import PlayerRepository from './domain/repositories/player.repository';
import Player from './domain/entities/player.interface';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(readonly playerRepository: PlayerRepository) {}

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

  async updatePlayer(id: string, playerDto: CreatePlayerDto): Promise<any> {
    const foundPlayer: Player = await this.playerRepository.getFindById(id);
    if (!foundPlayer) throw new NotFoundException('Player not found');
    return this.playerRepository.update(id, playerDto);
  }

  async deletePlayer(email: string): Promise<void> {
    const foundPlayer: Player = await this.playerRepository.getFindByEmail(
      email,
    );
    if (!foundPlayer) throw new NotFoundException(`Player not found`);
    return this.playerRepository.delete(email);
  }
}
