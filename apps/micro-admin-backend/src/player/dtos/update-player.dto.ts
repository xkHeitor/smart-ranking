import {} from 'class-transformer';
import { IsOptional } from 'class-validator';

export default class UpdatePlayerDto {
  @IsOptional()
  readonly phoneNumber?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  photoUrl?: string;
}
