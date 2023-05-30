import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configs } from 'configs/index.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      envFilePath: ['.env'],
    }),
  ],
})
export class ApiGatewayModule {}
