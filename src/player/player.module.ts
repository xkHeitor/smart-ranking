import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerRepositoryModule } from './domain/repositories/player-repository.module';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [PlayerRepositoryModule],
})
export class PlayerModule {}
