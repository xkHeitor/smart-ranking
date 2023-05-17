import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import { PlayerService } from './player.service';
import Player from './domain/entities/player.interface';

@Controller('api/v1/player')
export class PlayerController {
  constructor(readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUpdatePlayer(@Body() playerDto: CreatePlayerDto): Promise<any> {
    return this.playerService.createUpdatePlayer(playerDto);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (!email) return this.playerService.getAllPlayers();
    return this.playerService.getPlayerByEmail(email);
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    return this.playerService.deletePlayer(email);
  }
}
