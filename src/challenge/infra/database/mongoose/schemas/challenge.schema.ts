import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema(
  {
    dateTimeMatch: { type: Date },
    status: { type: String },
    dateTimeRequest: { type: Date },
    dateTimeResponse: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: mongoose.Schema.Types.ObjectId },
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
  { timestamps: true, collection: 'challenges' },
);
