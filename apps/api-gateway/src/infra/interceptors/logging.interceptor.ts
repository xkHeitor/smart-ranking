import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as momentTimezone from 'moment-timezone';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const getDate = () =>
      momentTimezone.tz('America/Sao_Paulo').format('HH:mm:ss DD-MM-YYYY');
    console.log(`Start... ${getDate()}`);
    return next
      .handle()
      .pipe(tap(() => console.log(`Finish in... ${getDate()}`)));
  }
}
