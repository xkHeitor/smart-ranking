import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PlayerRepository from './player.repository';
import PlayerMongooseRepository from '../../infra/database/mongoose/repositories/player-mongoose.repository';
import { PlayerSchema } from '../../infra/database/mongoose/schemas/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  providers: [
    {
      provide: PlayerRepository,
      useClass: PlayerMongooseRepository,
    },
  ],
  exports: [PlayerRepository],
})
export class PlayerRepositoryModule {}
