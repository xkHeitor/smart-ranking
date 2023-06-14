import { Configs } from '@configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from '@queue';
import { PlayerController } from './player.controller';

@Module({
  controllers: [PlayerController],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      envFilePath: ['.env'],
    }),
    QueueModule,
  ],
})
export class PlayerModule {}
