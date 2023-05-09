import { Body, Controller, Post } from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(readonly playerService: PlayerService) {}

  @Post()
  async createUpdate(@Body() playerDto: CreatePlayerDto): Promise<any> {
    return await this.playerService.createUpdate(playerDto);
  }
}
