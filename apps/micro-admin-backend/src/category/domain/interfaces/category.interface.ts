import { Document } from 'mongoose';

export default interface Category extends Document {
  readonly _id: string;
  readonly name: string;
  description: string;
  events: Event[];
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
