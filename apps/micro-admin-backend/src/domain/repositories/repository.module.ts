import CategoryMongooseRepository from '@micro-admin-backend/infra/database/mongoose/repositories/category-mongoose.repository';
import PlayerMongooseRepository from '@micro-admin-backend/infra/database/mongoose/repositories/player-mongoose.repository';
import { CategorySchema } from '@micro-admin-backend/infra/database/mongoose/schemas/category.schema';
import { PlayerSchema } from '@micro-admin-backend/infra/database/mongoose/schemas/player.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CategoryRepository from './category.repository';
import PlayerRepository from './player.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Player', schema: PlayerSchema },
    ]),
  ],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryMongooseRepository,
    },
    {
      provide: PlayerRepository,
      useClass: PlayerMongooseRepository,
    },
  ],
  exports: [CategoryRepository, PlayerRepository],
})
export class RepositoryModule {}
