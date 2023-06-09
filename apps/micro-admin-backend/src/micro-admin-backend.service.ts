import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import Category from './domain/interfaces/category.interface';
import CategoryRepository from './domain/repositories/category.repository';
import PlayerRepository from './domain/repositories/player.repository';

@Injectable()
export class MicroAdminBackendService {
  private readonly logger = new Logger(MicroAdminBackendService.name);

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async createCategory(category: Category): Promise<void> {
    try {
      return await this.categoryRepository.create(category);
    } catch (error: any) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findById(id);
    } catch (err: any) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.getAll();
    } catch (err: any) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
      throw new RpcException(err.message);
    }
  }
}
