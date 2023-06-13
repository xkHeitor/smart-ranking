import { Controller, Logger } from '@nestjs/common';
import { MicroAdminBackendService } from './micro-admin-backend.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import Category from './domain/interfaces/category.interface';
import Queue from '../../common/src/queue/queue.interface';

@Controller()
export class MicroAdminBackendController {
  private readonly logger = new Logger(MicroAdminBackendController.name);

  constructor(
    private readonly microAdminBackendService: MicroAdminBackendService,
    private readonly queue: Queue,
  ) {}

  @EventPattern('create-category') // Listener
  async createCategory(
    @Payload() category: Category,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log(`category: ${JSON.stringify(category)}`);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.microAdminBackendService.createCategory(category);
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

  @MessagePattern('get-categories')
  async getCategories(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      return await (id
        ? this.microAdminBackendService.getCategoryById(id)
        : this.microAdminBackendService.getCategories());
    } finally {
      await channel.ack(originalMsg);
    }
  }
}
