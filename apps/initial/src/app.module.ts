import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ChallengeModule } from './challenge/challenge.module';
import Environments from './config/environment';
import { ConfigModule } from '@nestjs/config';
import { Configs } from 'configs/index.config';

const Envs = new Environments();
@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
    }),
    MongooseModule.forRoot(Envs.getDbConnection()),
    PlayerModule,
    CategoryModule,
    ChallengeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
