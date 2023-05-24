import { Document } from 'mongoose';
import { StatusChallenge } from './status-challenge.interface';

export default interface Challenge extends Document {
  dateTimeMatch: Date;
  status: StatusChallenge;
  dateTimeRequest: Date;
  dateTimeResponse?: Date;
  requester: string;
  category: string;
  players: string[];
  match?: string;
}
