import { Configs } from '@configs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs['apiGatewayConfig'],
    }),
  ],
})
export class ApiGatewayModule {}
