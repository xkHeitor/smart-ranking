import { Module } from '@nestjs/common';
import { CategoryModule } from 'apps/initial/src/category/category.module';
import { PlayerModule } from 'apps/initial/src/player/player.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeRepositoryModule } from './domain/repositories/challenge-repository.module';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports: [ChallengeRepositoryModule, CategoryModule, PlayerModule],
})
export class ChallengeModule {}
