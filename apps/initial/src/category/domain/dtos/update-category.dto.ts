import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Event } from '../entities/category.interface';

export default class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Event[];
}
