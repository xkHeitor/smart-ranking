import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AllExceptionFilter from './common/filters/http-exception.filter';
import momentTimezone from 'moment-timezone';
import { ConfigService } from '@nestjs/config';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  const configService = app.get(ConfigService);
  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  const PORT: number = configService.get<number>('main.port');
  await app.listen(PORT);
})();
