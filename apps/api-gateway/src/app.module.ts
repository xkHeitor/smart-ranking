import { Configs } from '@configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from '@queue';
import { AwsModule } from 'apps/common/src';
import { CategoryController } from './category/category.controller';
import { ChallengeController } from './challenge/challenge.controller';
import { PlayerController } from './player/player.controller';

@Module({
  controllers: [PlayerController, CategoryController, ChallengeController],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      envFilePath: ['.env'],
    }),
    QueueModule,
    AwsModule,
  ],
})
export class AppModule {}
