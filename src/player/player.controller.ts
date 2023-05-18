import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import { PlayerService } from './player.service';
import Player from './domain/entities/player.interface';
import PlayerValidationParamsPipe from './infra/pipes/player-validation-params.pipe';
import UpdatePlayerDto from './domain/dtos/update-player.dto';

@Controller('api/v1/player')
export class PlayerController {
  constructor(readonly playerService: PlayerService) {}

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playerService.getAllPlayers();
  }

  @Get('/:id')
  async getPlayer(
    @Param('id', PlayerValidationParamsPipe) id: string,
  ): Promise<Player> {
    return this.playerService.getPlayerById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() playerDto: CreatePlayerDto): Promise<any> {
    return this.playerService.createPlayer(playerDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() playerDto: UpdatePlayerDto,
    @Param('id', PlayerValidationParamsPipe) id: string,
  ): Promise<any> {
    return this.playerService.updatePlayer(id, playerDto);
  }

  @Delete()
  async deletePlayer(
    @Query('id', PlayerValidationParamsPipe) id: string,
  ): Promise<void> {
    return this.playerService.deletePlayer(id);
  }
}
