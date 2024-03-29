import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreatePlayerDto from 'apps/initial/src/player/domain/dtos/create-player.dto';
import UpdatePlayerDto from 'apps/initial/src/player/domain/dtos/update-player.dto';
import Player from 'apps/initial/src/player/domain/entities/player.interface';
import PlayerRepository from 'apps/initial/src/player/domain/repositories/player.repository';

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
    this.playerModel
      .findOneAndUpdate({ _id: id }, { $set: createPlayerDto })
      .exec();
  }

  async delete(id: string): Promise<void> {
    this.playerModel.findOneAndRemove({ _id: id }).exec();
  }
}
