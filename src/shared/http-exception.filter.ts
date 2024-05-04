import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof UnauthorizedException && exception.message === 'Token expired') {
      response
        .status(status)
        .json({
          statusCode: status,
          message: 'Token expired',
        });
    } else {
      response
        .status(status)
        .json({
          statusCode: status,
          message: exception.message,
        });
    }
  }
}