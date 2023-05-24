import { IsNotEmpty } from 'class-validator';
import Player from 'src/player/domain/entities/player.interface';

export default class AssignMatchChallengeDto {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  resultado: string[];
}
