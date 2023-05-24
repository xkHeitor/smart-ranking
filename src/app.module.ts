import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ChallengeModule } from './challenge/challenge.module';
import Environments from './config/environment';

const Envs = new Environments();
@Module({
  imports: [
    MongooseModule.forRoot(Envs.getDbConnection()),
    PlayerModule,
    CategoryModule,
    ChallengeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
