import CreateCategoryDto from '../dtos/create-category.dto';
import UpdateCategoryDto from '../dtos/update-category.dto';
import Category from '../entities/category.interface';

export default abstract class CategoryRepository {
  abstract getAll(): Promise<Category[]>;
  abstract create(createCategoryDto: CreateCategoryDto): Promise<void>;
  abstract findByName(name: string): Promise<Category>;
  abstract update(
    name: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void>;
}
