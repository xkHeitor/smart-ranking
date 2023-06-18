import { Configs } from '@configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';

import { QueueModule } from '@queue';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { RepositoryModule } from './infra/database/mongoose/repositories/repository.module';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';

config();
const urlMongoConnect = `${process.env.DB_URL_MONGO}${process.env.DB_MONGO_NAME_MICRO_ADMIN}${process.env.DB_CONFIG_MONGO}`;
@Module({
  controllers: [PlayerController, CategoryController],
  providers: [PlayerService, CategoryService],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
    }),
    RepositoryModule,
    QueueModule,
    MongooseModule.forRoot(urlMongoConnect),
  ],
})
export class AppModule {}
