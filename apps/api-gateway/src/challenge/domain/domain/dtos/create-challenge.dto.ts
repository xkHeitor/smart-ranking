import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import Player from 'apps/initial/src/player/domain/entities/player.interface';

export default class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dateTimeMatch: Date;

  @IsNotEmpty()
  requester: string;

  @IsNotEmpty()
  category: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Player[];
}
