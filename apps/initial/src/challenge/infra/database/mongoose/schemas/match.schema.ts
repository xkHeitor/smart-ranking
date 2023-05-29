import mongoose from 'mongoose';
import generateSchema from 'apps/initial/src/common/database/mongoose/generate-schema';

export const MatchSchema = generateSchema(
  {
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players',
      },
    ],
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'players',
    },
    result: [{ set: { type: String } }],
  },
  'matches',
);
