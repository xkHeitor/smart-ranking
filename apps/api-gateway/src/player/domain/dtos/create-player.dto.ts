import {} from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreatePlayerDto {
  @IsNotEmpty()
  readonly categoryId: string;

  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  name: string;
}
