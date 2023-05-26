import { Document } from 'mongoose';
import Player from 'src/player/domain/entities/player.interface';
import Result from './result.interface';

export default interface Match extends Document {
  category: string;
  players: Player[];
  winner: Player;
  result: Result[];
}
