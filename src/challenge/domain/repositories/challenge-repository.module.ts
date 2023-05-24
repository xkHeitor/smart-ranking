import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from 'src/challenge/infra/database/mongoose/schemas/challenge.schema';
import ChallengeRepository from './challenge.repository';
import ChallengeMongooseRepository from 'src/challenge/infra/database/mongoose/repositories/challenge-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
  ],
  providers: [
    {
      provide: ChallengeRepository,
      useClass: ChallengeMongooseRepository,
    },
  ],
  exports: [ChallengeRepository],
})
export class ChallengeRepositoryModule {}
