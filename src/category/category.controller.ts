import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import { CategoryService } from './category.service';
import Category from './domain/entities/category.interface';

@Controller('api/v1/category')
export class CategoryController {
  constructor(readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<void> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }
}
