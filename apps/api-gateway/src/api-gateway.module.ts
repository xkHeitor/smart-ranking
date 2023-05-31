import { Configs } from 'apps/common/src/configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ApiGatewayController from './api-gateway.controller';
import { QueueModule } from 'apps/common/src/queue';

@Module({
  controllers: [ApiGatewayController],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      envFilePath: ['.env'],
    }),
    QueueModule,
  ],
})
export class ApiGatewayModule {}
