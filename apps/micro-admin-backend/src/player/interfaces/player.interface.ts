import { Document } from 'mongoose';

export default interface Player extends Document {
  readonly _id: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly category: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  photoUrl: string;
}
