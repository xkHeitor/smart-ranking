import {} from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export default class UpdatePlayerDto {
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsNotEmpty()
  name: string;
}
