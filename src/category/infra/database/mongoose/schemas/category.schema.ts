import mongoose, * as Mongoose from 'mongoose';

export const CategorySchema = new Mongoose.Schema(
  {
    name: { type: 'string', unique: true },
    description: String,
    events: [
      {
        name: String,
        operation: String,
        value: Number,
      },
    ],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'players',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
