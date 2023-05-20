import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateCategoryDto from 'src/category/domain/dtos/create-category.dto';
import Category from 'src/category/domain/entities/category.interface';
import CategoryRepository from 'src/category/domain/repositories/category.repository';

export default class CategoryMongooseRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name }).exec();
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    const categoryCreated = new this.categoryModel(createCategoryDto);
    categoryCreated.save();
  }
}
