import { IsNotEmpty } from 'class-validator';
import Player from 'src/player/domain/entities/player.interface';
import Result from '../entities/result.interface';

export default class AssignMatchChallengeDto {
  @IsNotEmpty()
  winner: Player;

  @IsNotEmpty()
  result: Result[];
}
