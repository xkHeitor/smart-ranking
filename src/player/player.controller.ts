import { Body, Controller, Post } from '@nestjs/common';
import CreatePlayerDto from './domain/dtos/create-player.dto';

@Controller('api/v1/player')
export class PlayerController {
  @Post()
  async createUpdate(@Body() playerDto: CreatePlayerDto): Promise<any> {
    const { email } = playerDto;
    return {
      name: email,
    };
  }
}
