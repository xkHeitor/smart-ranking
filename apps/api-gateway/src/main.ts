import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as momentTimezone from 'moment-timezone';
import { ApiGatewayModule } from './api-gateway.module';
import AllExceptionFilter from './infra/filters/http-exception.filter';

(async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalFilters(new AllExceptionFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone
      .default(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  const configService = app.get(ConfigService);
  const PORT: number = configService.get<number>('api-gateway.port');
  await app.listen(PORT);
})();
