import CreateCategoryDto from '@micro-admin-backend/category/domain/dtos/create-category.dto';
import UpdateCategoryDto from '@micro-admin-backend/category/domain/dtos/update-category.dto';
import Category from '@micro-admin-backend/category/domain/interfaces/category.interface';
import CategoryRepository from '@micro-admin-backend/category/domain/repositories/category.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export default class CategoryMongooseRepository implements CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name }).populate('players').exec();
  }

  async findById(_id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id }).populate('players').exec();
  }

  async getAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('players').exec();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    const categoryCreated = new this.categoryModel(createCategoryDto);
    await categoryCreated.save();
  }

  async update(
    _id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoryModel
      .findOneAndUpdate({ _id }, { $set: updateCategoryDto })
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
