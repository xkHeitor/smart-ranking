import { Module } from '@nestjs/common';
import CategoryController from './category.controller';

@Module({
  providers: [],
  controllers: [CategoryController],
  // exports: [CategoryService],
})
export class CategoryModule {}
