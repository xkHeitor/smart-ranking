import { Injectable } from '@nestjs/common';
import CreatePlayerDto from 'src/player/domain/dtos/create-player.dto';
import UpdatePlayerDto from 'src/player/domain/dtos/update-player.dto';
import Player from 'src/player/domain/entities/player.interface';
import PlayerRepository from 'src/player/domain/repositories/player.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class PlayerMemoryRepository implements PlayerRepository {
  private players: Player[] = [];

  async getAll(): Promise<Player[]> {
    return this.players;
  }

  async getFindByEmail(email: string): Promise<Player> {
    return this.players.find((player) => player.email === email);
  }

  async getFindById(id: string): Promise<Player> {
    return this.players.find((player) => player._id === id);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    this.players.push({
      ...createPlayerDto,
      _id: uuidv4(),
      ranking: 'F',
      rankingPosition: this.players.length + 1,
      photoUrl: 'none',
    } as Player);

    return this.players[this.players.length - 1];
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    this.players = this.players.map((player) => {
      if (player._id === id) player = Object.assign(player, updatePlayerDto);
      return player;
    });
  }

  async delete(email: string): Promise<void> {
    this.players = this.players.filter((player) => player.email != email);
  }
}
