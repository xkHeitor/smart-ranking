import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreatePlayerDto from 'src/player/domain/dtos/create-player.dto';
import Player from 'src/player/domain/entities/player.interface';
import PlayerRepository from 'src/player/domain/repositories/player.repository';

export default class PlayerMongooseRepository implements PlayerRepository {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async getAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async getFindByEmail(email: string): Promise<Player> {
    return this.playerModel.findOne({ email });
  }

  async getFindById(id: string): Promise<Player> {
    return this.playerModel.findOne({ _id: id });
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);
    return playerCreated.save();
  }

  async update(id: string, createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerModel
      .findOneAndUpdate({ _id: id }, { $set: createPlayerDto })
      .exec();
  }

  async delete(email: string): Promise<void> {
    this.playerModel.findOneAndRemove({ email }).exec();
  }
}
