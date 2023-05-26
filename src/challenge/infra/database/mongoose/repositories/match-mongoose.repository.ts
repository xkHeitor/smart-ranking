import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Match from 'src/challenge/domain/entities/match.interface';
import MatchRepository from 'src/challenge/domain/repositories/match.repository';

export default class MatchMongooseRepository implements MatchRepository {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<Match>,
  ) {}

  async create(createMatch: Match): Promise<Match> {
    const match = new this.matchModel(createMatch);
    return match.save();
  }

  async deleteById(_id: string): Promise<void> {
    await this.matchModel.deleteOne({ _id }).exec();
  }
}
