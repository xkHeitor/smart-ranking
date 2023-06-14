import { Document } from 'mongoose';

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
