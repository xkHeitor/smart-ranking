import { IsNotEmpty } from 'class-validator';
import Result from '../entities/result.interface';

export default class AssignMatchChallengeDto {
  @IsNotEmpty()
  winner: string;

  @IsNotEmpty()
  result: Result[];
}
