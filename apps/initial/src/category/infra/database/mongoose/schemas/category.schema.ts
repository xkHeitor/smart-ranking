import mongoose, * as Mongoose from 'mongoose';
import generateSchema from 'apps/initial/src/common/database/mongoose/generate-schema';

export const CategorySchema = generateSchema(
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
  'categories',
);
