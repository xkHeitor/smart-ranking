import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as momentTimezone from 'moment-timezone';
import { CategoryModule } from './category/category.module';
import AllExceptionFilter from './infra/filters/http-exception.filter';
import LoggingInterceptor from './infra/interceptors/logging.interceptor';
import TimeoutInterceptor from './infra/interceptors/timeout.interceptor';

(async function bootstrap() {
  const app = await NestFactory.create(CategoryModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
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
