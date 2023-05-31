import CreateCategoryDto from '@micro-admin-backend/domain/dtos/create-category.dto';
import UpdateCategoryDto from '@micro-admin-backend/domain/dtos/update-category.dto';
import Category from '@micro-admin-backend/domain/interfaces/category.interface';
import CategoryRepository from '@micro-admin-backend/domain/repositories/category.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export default class CategoryMongooseRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name }).populate('players').exec();
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('players').exec();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    const categoryCreated = new this.categoryModel(createCategoryDto);
    await categoryCreated.save();
  }

  async update(
    name: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoryModel
      .findOneAndUpdate({ name }, { $set: updateCategoryDto })
      .exec();
  }

  async verifyPlayerInCategory(
    categoryName: string,
    playerId: any,
  ): Promise<any> {
    return this.categoryModel
      .find({ name: categoryName })
      .where('players')
      .in(playerId)
      .exec();
  }

  async verifyPlayerCategories(playerId: any): Promise<any> {
    return this.categoryModel.findOne().where('players').in(playerId).exec();
  }
}
