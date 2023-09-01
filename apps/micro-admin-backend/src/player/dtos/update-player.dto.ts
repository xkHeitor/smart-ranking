import {} from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdatePlayerDto {
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  photoUrl?: string;
}
