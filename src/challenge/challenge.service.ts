import { BadRequestException, Injectable } from '@nestjs/common';
import Player from 'src/player/domain/entities/player.interface';
import { PlayerService } from 'src/player/player.service';
import { CategoryService } from './../category/category.service';
import CreateChallengeDto from './domain/dtos/create-challenge.dto';
import ChallengeRepository from './domain/repositories/challenge.repository';
import Challenge from './domain/entities/challenge.interface';
import UpdateChallengeDto from './domain/dtos/update-challenge.dto';

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

  async getAllChallenges(): Promise<Challenge[]> {
    return this.challengeRepository.getAll();
  }

  async getChallengesById(id: string): Promise<Challenge> {
    const foundChallenge = await this.challengeRepository.getFindById(id);
    if (!foundChallenge) throw new BadRequestException('Challenge not found');
    return foundChallenge;
  }

  async getChallengeByPlayer(playerId: string): Promise<Challenge[]> {
    await this.playerService.getPlayerById(playerId);
    return this.challengeRepository.getChallengeByPlayer(playerId);
  }

  async updateChallenge(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {
    const challengeData = await this.getChallengesById(id);
    if (updateChallengeDto.status) challengeData.dateTimeResponse = new Date();

    [challengeData.status, challengeData.dateTimeMatch] = [
      updateChallengeDto.status,
      updateChallengeDto.dateTimeMatch,
    ];
    return this.challengeRepository.update(id, challengeData);
  }

  async deleteChallenge(id: string): Promise<void> {
    await this.getChallengesById(id);
    await this.challengeRepository.delete(id);
  }

  // async assignMatchChallenge(
  //   id: string,
  //   assignMatchChallengeDto: AssignMatchChallengeDto,
  // ): Promise<void> {}
  // async deleteChallenge(id: string): Promise<void> {}
}
