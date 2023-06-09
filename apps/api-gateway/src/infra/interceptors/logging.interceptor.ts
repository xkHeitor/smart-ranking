import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export default class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const dateNow = Date.now();
    console.log(`Start... ${new Date()}`);
    return next
      .handle()
      .pipe(tap(() => console.log(`Finish in... ${Date.now() - dateNow}ms`)));
  }
}
