import { Document } from 'mongoose';
import { StatusChallenge } from './status-challenge.interface';
import Player from 'src/player/domain/entities/player.interface';

export default interface Challenge extends Document {
  dateTimeMatch: Date;
  status: StatusChallenge;
  dateTimeRequest: Date;
  dateTimeResponse?: Date;
  requester: string;
  category: string;
  players: Player[];
  match?: string;
}
