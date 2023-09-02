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
  },
  { timestamps: true, collection: 'categories' },
);
