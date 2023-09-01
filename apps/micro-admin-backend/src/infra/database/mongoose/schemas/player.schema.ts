import mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    email: { type: 'string', unique: true },
    phoneNumber: String,
    name: String,
    ranking: String,
    rankingPosition: Number,
    photoUrl: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true, collection: 'players' },
);
