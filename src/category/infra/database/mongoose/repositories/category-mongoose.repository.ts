import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateCategoryDto from 'src/category/domain/dtos/create-category.dto';
import UpdateCategoryDto from 'src/category/domain/dtos/update-category.dto';
import Category from 'src/category/domain/entities/category.interface';
import CategoryRepository from 'src/category/domain/repositories/category.repository';

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
    categoryCreated.save();
  }

  async update(
    name: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    this.categoryModel
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
}
