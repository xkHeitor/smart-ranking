import { BadRequestException, Injectable } from '@nestjs/common';
import CategoryRepository from './domain/repositories/category.repository';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import Category from './domain/entities/category.interface';
import UpdateCategoryDto from './domain/dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }

  async getCategoryByName(name: string): Promise<Category> {
    const foundCategory = await this.categoryRepository.findByName(name);
    if (!foundCategory)
      throw new BadRequestException(`Category ${name} not exists`);
    return foundCategory;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    const { name } = createCategoryDto;
    const foundCategory = await this.categoryRepository.findByName(name);
    if (foundCategory)
      throw new BadRequestException(`Category ${name} already exists`);
    return this.categoryRepository.create(createCategoryDto);
  }

  async updateCategory(
    name: string,
    createCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundCategory = await this.categoryRepository.findByName(name);
    if (!foundCategory)
      throw new BadRequestException(`Category ${name} not exists`);
    return this.categoryRepository.update(name, createCategoryDto);
  }
}
