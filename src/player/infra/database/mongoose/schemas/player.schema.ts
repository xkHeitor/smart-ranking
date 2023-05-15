import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: 'string', unique: true },
    email: { type: 'string', unique: true },
    name: String,
    ranking: String,
    rankingPosition: Number,
    photoUR: String,
  },
  { timestamps: true, collection: 'players' },
);
