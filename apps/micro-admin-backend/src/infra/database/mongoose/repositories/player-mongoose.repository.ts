import CreatePlayerDto from '@micro-admin-backend/domain/dtos/create-player.dto';
import UpdatePlayerDto from '@micro-admin-backend/domain/dtos/update-player.dto';
import Player from '@micro-admin-backend/domain/interfaces/player.interface';
import PlayerRepository from '@micro-admin-backend/domain/repositories/player.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export default class PlayerMongooseRepository implements PlayerRepository {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async getAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async getFindById(id: string): Promise<Player> {
    return this.playerModel.findOne({ _id: id });
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);
    return playerCreated.save();
  }

  async update(id: string, createPlayerDto: UpdatePlayerDto): Promise<void> {
    await this.playerModel
      .findOneAndUpdate({ _id: id }, { $set: createPlayerDto })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.playerModel.findOneAndRemove({ _id: id }).exec();
  }
}
