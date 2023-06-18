import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import UpdateCategoryDto from './domain/dtos/update-category.dto';
import Category from './domain/interfaces/category.interface';
import CategoryRepository from './domain/repositories/category.repository';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}

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

  async updateCategory(
    id: string,
    createCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundCategory: Category = await this.categoryRepository.findById(id);
    if (!foundCategory)
      throw new BadRequestException(`Category ${id} not exists`);
    return this.categoryRepository.update(id, createCategoryDto);
  }
}
