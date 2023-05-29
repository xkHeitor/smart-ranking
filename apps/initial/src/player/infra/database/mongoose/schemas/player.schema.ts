import generateSchema from 'apps/initial/src/common/database/mongoose/generate-schema';

export const PlayerSchema = generateSchema(
  {
    email: { type: 'string', unique: true },
    phoneNumber: String,
    name: String,
    ranking: String,
    rankingPosition: Number,
    photoUR: String,
  },
  'players',
);
