import { Document } from 'mongoose';
import { StatusChallenge } from './status-challenge.interface';
import Player from 'apps/initial/src/player/domain/entities/player.interface';
import Category from 'apps/initial/src/category/domain/entities/category.interface';

export default interface Challenge extends Document {
  dateTimeMatch: Date;
  status: StatusChallenge;
  dateTimeRequest: Date;
  dateTimeResponse?: Date;
  requester: string;
  category: Category;
  players: Player[];
  match?: string;
}
