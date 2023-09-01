import { Controller, Logger, NotFoundException } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Queue } from '@queue';
import Player from './interfaces/player.interface';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  private readonly logger = new Logger(PlayerController.name);

  constructor(
    private readonly playerService: PlayerService,
    private readonly queue: Queue,
  ) {}

  private async execEvent(context, fn, params): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService[fn](...params);
      await channel.ack(originalMsg);
    } catch (error: any) {
      this.logger.error(`error:  ${error.message}`);
      for (const ackError of this.queue.ackErrors) {
        if (
          error?.message.includes(ackError) ||
          error instanceof NotFoundException
        ) {
          await channel.ack(originalMsg);
          break;
        }
      }
    }
  }

  @MessagePattern('get-players')
  async getPlayers(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      return await (id
        ? this.playerService.getPlayerById(id)
        : this.playerService.getAllPlayers());
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('create-player')
  async createPlayer(
    @Payload() player: Player,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(`player: ${JSON.stringify(player)}`);
    const functionName = this.playerService.createPlayer.name;
    await this.execEvent(context, functionName, player);
  }

  @EventPattern('update-player')
  async updatePlayers(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(`player data: ${JSON.stringify(data)}`);
    const functionName = this.playerService.updatePlayer.name;
    const [id, player] = [data.id, data.player];
    await this.execEvent(context, functionName, { id, player });
  }

  @EventPattern('delete-player')
  async deletePlayers(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const functionName = this.playerService.deletePlayer.name;
    await this.execEvent(context, functionName, id);
  }
}
