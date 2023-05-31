import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
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
        ref: 'Player', // Document Name
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
