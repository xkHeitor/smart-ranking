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
    await this.queue.finalizeMsg(
      this.microAdminBackendService.createCategory,
      category,
      context,
    );
  }

  @MessagePattern('get-categories')
  async getCategories(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const callback = id
      ? this.microAdminBackendService.getCategoryById
      : this.microAdminBackendService.getCategories;

    return await this.queue.finalizeMsg(callback, id, context);
  }
}
