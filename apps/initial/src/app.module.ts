import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from 'apps/common/src/configs';
import { CategoryModule } from './category/category.module';
import { ChallengeModule } from './challenge/challenge.module';
import Environments from './config/environment';
import { PlayerModule } from './player/player.module';

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
})
export class AppModule {}
