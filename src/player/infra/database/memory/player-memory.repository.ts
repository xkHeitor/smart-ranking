import { Injectable } from '@nestjs/common';
import CreatePlayerDto from 'src/player/domain/dtos/create-player.dto';
import Player from 'src/player/domain/entities/player.interface';
import PlayerRepository from 'src/player/domain/repositories/player.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class PlayerMemoryRepository implements PlayerRepository {
  private players: Player[] = [];

  async getAll(): Promise<Player[]> {
    return this.players;
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.players.push({
      ...createPlayerDto,
      _id: uuidv4(),
      ranking: 'F',
      rankingPosition: this.players.length + 1,
      photoUrl: 'none',
    });
  }
}
