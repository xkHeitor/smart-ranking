import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Queue } from '@queue';
import { Observable } from 'rxjs';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import UpdateCategoryDto from './domain/dtos/update-category.dto';

@Controller('api/v1/categories')
export class CategoryController {
  private logger = new Logger(CategoryController.name);

  constructor(private readonly queue: Queue) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    await this.queue.emitter('create-category', createCategoryDto);
  }

  @Get()
  async getCategories(@Query('id') _id: string): Promise<Observable<void>> {
    return this.queue.sender('get-categories', _id || '');
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<Observable<void>> {
    return this.queue.emitter('update-category', {
      id: id,
      category: updateCategoryDto,
    });
  }
}
