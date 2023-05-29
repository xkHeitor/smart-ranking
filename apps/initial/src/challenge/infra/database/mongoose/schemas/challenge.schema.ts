import * as mongoose from 'mongoose';
import generateSchema from 'apps/initial/src/common/database/mongoose/generate-schema';

export const ChallengeSchema = generateSchema(
  {
    dateTimeMatch: { type: Date },
    status: { type: String },
    dateTimeRequest: { type: Date },
    dateTimeResponse: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  },
  'challenges',
);
