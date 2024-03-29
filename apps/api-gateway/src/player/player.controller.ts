import { AwsService } from '@aws';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from '@queue';
import { Observable } from 'rxjs';

import { ConfigService } from '@nestjs/config';
import CreatePlayerDto from './domain/dtos/create-player.dto';
import UpdatePlayerDto from './domain/dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayerController {
  constructor(
    private readonly queue: Queue,
    private readonly aws: AwsService,
    private readonly configService: ConfigService,
  ) {
    const queueName = this.configService.get<string>('api-gateway.queueName');
    this.queue.connect(queueName);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    const category = await this.queue.sender(
      'get-categories',
      createPlayerDto.category,
      true,
    );

    if (!category) throw new BadRequestException('Category not exist');
    await this.queue.emitter('create-player', createPlayerDto);
  }

  @Get()
  async getPlayers(@Query('id') id: string): Promise<Observable<any>> {
    return this.queue.sender('get-players', id || '');
  }

  @Delete()
  @UsePipes(ValidationPipe)
  async deletePlayers(@Query('id') id: string): Promise<void> {
    return this.queue.emitter('delete-player', id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.queue.emitter('update-player', {
      id,
      player: { ...updatePlayerDto },
    });
  }

  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Param('id') id: string,
  ): Promise<any> {
    const player = await this.queue.sender('get-players', id);
    if (!player) throw new BadRequestException('Player not found');

    const photoUrl = (await this.aws.uploadFile(file, id)).url;
    await this.queue.emitter('update-player', {
      id,
      player: { photoUrl },
    });

    return this.queue.sender('get-players', id);
  }
}
