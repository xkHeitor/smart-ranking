import { Document } from 'mongoose';
import Player from 'src/player/domain/entities/player.interface';

export default interface Category extends Document {
  readonly name: string;
  description: string;
  events: Event[];
  players: string[];
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
