import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepositoryModule } from './domain/repositories/category-repository.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [CategoryRepositoryModule, PlayerModule],
  exports: [CategoryService],
})
export class CategoryModule {}
