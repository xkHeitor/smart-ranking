import { Module } from '@nestjs/common';
import PlayerRepository from './domain/repositories/player.repository';
import PlayerMemoryRepository from './infra/database/memory/player-memory.repository';

@Module({
  providers: [
    {
      provide: PlayerRepository,
      useClass: PlayerMemoryRepository,
    },
  ],
  exports: [PlayerRepository],
})
export class PlayerRepositoryModule {}
