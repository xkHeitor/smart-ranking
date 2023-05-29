import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import AllExceptionFilter from './common/filters/http-exception.filter';
import momentTimezone from 'moment-timezone';

(async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(process.env.PORT);
})();
