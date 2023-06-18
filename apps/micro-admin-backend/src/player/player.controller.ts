import { Controller, Logger } from '@nestjs/common';
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

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService.createPlayer(player);
      await channel.ack(originalMsg);
    } catch (error: any) {
      this.logger.error(`error:  ${error.message}`);
      for (const ackError of this.queue.ackErrors) {
        if (error?.message.includes(ackError)) {
          await channel.ack(originalMsg);
          break;
        }
      }
    }
  }

  @EventPattern('update-player')
  async updatePlayers(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(`player data: ${JSON.stringify(data)}`);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const [id, player] = [data.id, data.player];
      console.log('🚀 ~ PlayerController ~ data:', data);
      await this.playerService.updatePlayer(id, player);
      await channel.ack(originalMsg);
    } catch (error: any) {
      this.logger.error(`error:  ${error.message}`);
      for (const ackError of this.queue.ackErrors) {
        if (error?.message.includes(ackError)) {
          await channel.ack(originalMsg);
          break;
        }
      }
    }
  }

  @EventPattern('delete-player')
  async deletePlayers(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.playerService.deletePlayer(id);
      await channel.ack(originalMsg);
    } catch (error: any) {
      this.logger.error(`error:  ${error.message}`);
      for (const ackError of this.queue.ackErrors) {
        if (error?.message.includes(ackError)) {
          await channel.ack(originalMsg);
          break;
        }
      }
    }
  }
}
