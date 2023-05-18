import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/category/infra/database/mongoose/schemas/category.schema';
import CategoryRepository from './category.repository';
import CategoryMongooseRepository from 'src/category/infra/database/mongoose/repositories/category-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryMongooseRepository,
    },
  ],
  exports: [CategoryRepository],
})
export class CategoryRepositoryModule {}
