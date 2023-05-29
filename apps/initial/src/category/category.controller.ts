import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import UpdateCategoryDto from './domain/dtos/update-category.dto';
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

  @Get('/:name')
  async getCategory(@Param('name') name: string): Promise<Category> {
    return await this.categoryService.getCategoryByName(name);
  }

  @Put('/:name')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('name') name: string,
  ): Promise<void> {
    await this.categoryService.updateCategory(name, updateCategoryDto);
  }

  @Post('/:categoryName/player/:playerId')
  async assignPlayerToCategory(@Param() params: string[]): Promise<void> {
    await this.categoryService.assignPlayerToCategory(params);
  }
}
