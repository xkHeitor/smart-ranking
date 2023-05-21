import { BadRequestException, Injectable } from '@nestjs/common';
import CategoryRepository from './domain/repositories/category.repository';
import CreateCategoryDto from './domain/dtos/create-category.dto';
import Category from './domain/entities/category.interface';
import UpdateCategoryDto from './domain/dtos/update-category.dto';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class CategoryService {
  constructor(
    readonly categoryRepository: CategoryRepository,
    readonly playerService: PlayerService,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.getAll();
  }

  async getCategoryByName(name: string): Promise<Category> {
    const foundCategory: Category = await this.categoryRepository.findByName(
      name,
    );
    if (!foundCategory)
      throw new BadRequestException(`Category ${name} not exists`);
    return foundCategory;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
    const { name } = createCategoryDto;
    const foundCategory: Category = await this.categoryRepository.findByName(
      name,
    );
    if (foundCategory)
      throw new BadRequestException(`Category ${name} already exists`);
    return this.categoryRepository.create(createCategoryDto);
  }

  async updateCategory(
    name: string,
    createCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const foundCategory: Category = await this.categoryRepository.findByName(
      name,
    );
    if (!foundCategory)
      throw new BadRequestException(`Category ${name} not exists`);
    return this.categoryRepository.update(name, createCategoryDto);
  }

  async assignPlayerToCategory(params: string[]): Promise<void> {
    const categoryName: string = params['categoryName'];
    const playerId: string = params['playerId'];

    const foundCategory: Category = await this.categoryRepository.findByName(
      categoryName,
    );
    if (!foundCategory)
      throw new BadRequestException(`Category ${categoryName} not exists`);

    await this.playerService.getPlayerById(playerId);
    const categoriesThatThereThisPlayer: Category[] =
      await this.categoryRepository.verifyPlayerInCategory(
        categoryName,
        playerId,
      );

    if (categoriesThatThereThisPlayer.length)
      throw new BadRequestException(`Player already registered`);
    foundCategory.players.push(playerId);
    return this.categoryRepository.update(categoryName, foundCategory);
  }
}
