import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateChallengeDto from 'src/challenge/domain/dtos/create-challenge.dto';
import Challenge from 'src/challenge/domain/entities/challenge.interface';
import { StatusChallenge } from 'src/challenge/domain/entities/status-challenge.interface';
import ChallengeRepository from 'src/challenge/domain/repositories/challenge.repository';

export default class ChallengeMongooseRepository
  implements ChallengeRepository
{
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
  ) {}

  async getAll(): Promise<Challenge[]> {
    return this.challengeModel
      .find()
      .populate('players')
      .populate('requester')
      .populate('category')
      .exec();
  }

  async getFindById(id: string): Promise<Challenge> {
    return this.challengeModel
      .findOne({ _id: id })
      .populate('players')
      .populate('requester')
      .populate('category')
      .exec();
  }

  async getChallengeByPlayer(playerId: string): Promise<Challenge[]> {
    return this.challengeModel
      .find()
      .where('players')
      .in(playerId as any)
      .populate('players')
      .populate('requester')
      .populate('category')
      .exec();
  }

  async create(
    createChallengeDto: CreateChallengeDto,
    categoryId: string,
  ): Promise<Challenge> {
    const createdChallenge = new this.challengeModel(createChallengeDto);
    createdChallenge.category = categoryId;
    createdChallenge.dateTimeRequest = new Date();
    createdChallenge.status = StatusChallenge.PENDING;
    return createdChallenge.save();
  }

  async update(id: string, updateChallengeDto: Challenge): Promise<void> {
    await this.challengeModel
      .findOneAndUpdate({ _id: id }, { $set: updateChallengeDto })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.challengeModel.deleteOne({ _id: id }).exec();
  }
}
