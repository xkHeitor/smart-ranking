import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import * as momentTimezone from 'moment-timezone';
import { ApiGatewayModule } from './api-gateway.module';
import AllExceptionFilter from './filters/http-exception.filter';

(async function bootstrap() {
  config();
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalFilters(new AllExceptionFilter());
  const configService = app.get(ConfigService);

  Date.prototype.toJSON = function (): any {
    return momentTimezone
      .default(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(configService.get<number>('app.port'));
})();
