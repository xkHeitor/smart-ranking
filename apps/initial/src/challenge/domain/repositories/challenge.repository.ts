import CreateChallengeDto from '../dtos/create-challenge.dto';
import UpdateChallengeDto from '../dtos/update-challenge.dto';
import Challenge from '../entities/challenge.interface';

export default abstract class ChallengeRepository {
  abstract getAll(): Promise<Challenge[]>;
  abstract getChallengeByPlayer(playerId: string): Promise<Challenge[]>;
  abstract getFindById(id: string): Promise<Challenge>;
  abstract create(
    createChallengeDto: CreateChallengeDto,
    categoryId: string,
  ): Promise<Challenge>;
  abstract update(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
