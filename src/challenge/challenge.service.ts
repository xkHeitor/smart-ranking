import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Player from 'src/player/domain/entities/player.interface';
import { PlayerService } from 'src/player/player.service';
import { CategoryService } from './../category/category.service';
import AssignMatchChallengeDto from './domain/dtos/assign-match-challenge.dto';
import CreateChallengeDto from './domain/dtos/create-challenge.dto';
import UpdateChallengeDto from './domain/dtos/update-challenge.dto';
import Challenge from './domain/entities/challenge.interface';
import ChallengeRepository from './domain/repositories/challenge.repository';
import MatchRepository from './domain/repositories/match.repository';
import Match from './domain/entities/match.interface';
import { StatusChallenge } from './domain/entities/status-challenge.interface';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly matchRepository: MatchRepository,
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

  async assignMatchChallenge(
    id: string,
    assignMatchChallengeDto: AssignMatchChallengeDto,
  ): Promise<void> {
    const challengeFound = await this.getChallengesById(id);
    const winnerIsOnChallenge = challengeFound.players.filter(
      (player) => player._id == assignMatchChallengeDto.winner,
    );
    if (!winnerIsOnChallenge.length)
      throw new BadRequestException('Winner not found');

    const createMatchDto = {
      ...assignMatchChallengeDto,
      category: challengeFound.category,
      players: challengeFound.players,
    } as unknown as Match;
    const match = await this.matchRepository.create(createMatchDto);

    challengeFound.status = StatusChallenge.FINISH;
    challengeFound.match = match._id;

    try {
      await this.challengeRepository.update(challengeFound._id, challengeFound);
    } catch (err: any) {
      await this.matchRepository.deleteById(match._id);
      throw new InternalServerErrorException();
    }
  }
}
