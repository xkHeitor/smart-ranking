import { Injectable } from '@nestjs/common';
import ChallengeRepository from './domain/repositories/challenge.repository';
import CreateChallengeDto from './domain/dtos/create-challenge.dto';
import Challenge from './domain/entities/challenge.interface';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<void> {}

  async getOneChallenge(id: string): Promise<Challenge> {}
  async getAllChallenges(): Promise<Challenge[]> {}
  async updateChallenge(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {}
  async assignMatchChallenge(
    id: string,
    assignMatchChallengeDto: AssignMatchChallengeDto,
  ): Promise<void> {}
  async deleteChallenge(id: string): Promise<void> {}
}
