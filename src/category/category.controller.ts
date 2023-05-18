import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import { CategoryService } from './category.service';

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
}
