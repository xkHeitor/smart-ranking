import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    email: { type: 'string', unique: true },
    phoneNumber: String,
    name: String,
    ranking: String,
    rankingPosition: Number,
    photoUR: String,
  },
  { timestamps: true, collection: 'players' },
);
