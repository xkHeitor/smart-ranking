import { IsOptional } from 'class-validator';
import { StatusChallenge } from '../entities/status-challenge.interface';

export default class UpdateChallengeDto {
  @IsOptional()
  status: StatusChallenge;
}
