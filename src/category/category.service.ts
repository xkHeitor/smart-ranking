import { BadRequestException, Injectable } from '@nestjs/common';
import CategoryRepository from './domain/repositories/category.repository';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import Category from './domain/entities/category.interface';

@Injectable()
export class CategoryService {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    const { name } = createCategoryDto;
    const foundCategory = await this.categoryRepository.findByName(name);
    if (foundCategory)
      throw new BadRequestException(`Category ${name} already exists`);
    return this.categoryRepository.create(createCategoryDto);
  }
}
