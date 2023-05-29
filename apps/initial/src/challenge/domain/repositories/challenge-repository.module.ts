import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeSchema } from 'apps/initial/src/challenge/infra/database/mongoose/schemas/challenge.schema';
import ChallengeRepository from './challenge.repository';
import ChallengeMongooseRepository from 'apps/initial/src/challenge/infra/database/mongoose/repositories/challenge-mongoose.repository';
import MatchRepository from './match.repository';
import MatchMongooseRepository from 'apps/initial/src/challenge/infra/database/mongoose/repositories/match-mongoose.repository';
import { MatchSchema } from 'apps/initial/src/challenge/infra/database/mongoose/schemas/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'Match', schema: MatchSchema },
    ]),
  ],
  providers: [
    {
      provide: ChallengeRepository,
      useClass: ChallengeMongooseRepository,
    },
    {
      provide: MatchRepository,
      useClass: MatchMongooseRepository,
    },
  ],
  exports: [ChallengeRepository, MatchRepository],
})
export class ChallengeRepositoryModule {}
