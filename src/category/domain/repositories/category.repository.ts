import CreateCategoryDto from '../dtos/create-category.dto';
import Category from '../entities/category.interface';

export default abstract class CategoryRepository {
  abstract create(createCategoryDto: CreateCategoryDto): Promise<void>;
  abstract findByName(name: string): Promise<Category>;
}
