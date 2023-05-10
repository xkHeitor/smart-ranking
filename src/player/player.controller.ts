import { Body, Controller, Get, Post } from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import { PlayerService } from './player.service';
import Player from './domain/entities/player.interface';

@Controller('api/v1/player')
export class PlayerController {
  constructor(readonly playerService: PlayerService) {}

  @Post()
  async createUpdatePlayer(@Body() playerDto: CreatePlayerDto): Promise<any> {
    return this.playerService.createUpdatePlayer(playerDto);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }
}
