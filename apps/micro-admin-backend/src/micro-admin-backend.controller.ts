import { Controller, Logger } from '@nestjs/common';
import { MicroAdminBackendService } from './micro-admin-backend.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import Category from './domain/interfaces/category.interface';

@Controller()
export class MicroAdminBackendController {
  private readonly logger = new Logger(MicroAdminBackendController.name);

  constructor(
    private readonly microAdminBackendService: MicroAdminBackendService,
  ) {}

  @EventPattern('create-category') // Listener
  async createCategory(@Payload() category: Category): Promise<void> {
    this.logger.log(`category: ${JSON.stringify(category)}`);
    await this.microAdminBackendService.createCategory(category);
  }
}
