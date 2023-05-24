import { Injectable } from '@nestjs/common';
import Player from 'src/player/domain/entities/player.interface';
import { PlayerService } from 'src/player/player.service';
import { CategoryService } from './../category/category.service';
import CreateChallengeDto from './domain/dtos/create-challenge.dto';
import ChallengeRepository from './domain/repositories/challenge.repository';
import Challenge from './domain/entities/challenge.interface';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly categoryService: CategoryService,
    private readonly playerService: PlayerService,
  ) {}

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    const playersForVerify: Player[] = [
      ...createChallengeDto.players,
      { _id: createChallengeDto.requester } as unknown as Player,
    ];

    for (const player of playersForVerify)
      await this.playerService.getPlayerById(player._id);

    const playerCategory = await this.categoryService.findPlayerInCategories(
      createChallengeDto.requester,
    );

    return await this.challengeRepository.create(
      createChallengeDto,
      playerCategory._id,
    );
  }

  async getOneChallenge(id: string): Promise<Challenge> {
    return this.challengeRepository.getFindById(id);
  }

  async getAllChallenges(): Promise<Challenge[]> {
    return this.challengeRepository.getAll();
  }
  // async updateChallenge(
  //   id: string,
  //   updateChallengeDto: UpdateChallengeDto,
  // ): Promise<void> {}
  // async assignMatchChallenge(
  //   id: string,
  //   assignMatchChallengeDto: AssignMatchChallengeDto,
  // ): Promise<void> {}
  // async deleteChallenge(id: string): Promise<void> {}
}
