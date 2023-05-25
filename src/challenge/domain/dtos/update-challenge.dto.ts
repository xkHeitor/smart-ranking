import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { StatusChallenge } from '../entities/status-challenge.interface';

export default class UpdateChallengeDto {
  @IsOptional()
  @IsDate()
  dateTimeMatch: Date;

  @IsOptional()
  @IsEnum(StatusChallenge)
  status: StatusChallenge;
}
