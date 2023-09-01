import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export default class CreatePlayerDto {
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  readonly category: string;

  @IsOptional()
  photoUrl?: string;
}
