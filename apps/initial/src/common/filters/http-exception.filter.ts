import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const [response, request] = [context.getResponse(), context.getRequest()];

    const isHttpException: boolean = exception instanceof HttpException;
    const status: number = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message: any = isHttpException ? exception.getResponse() : exception;

    this.logger.error(
      `Http Status ${status} Error Message: ${JSON.stringify(message)}`,
    );
    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
