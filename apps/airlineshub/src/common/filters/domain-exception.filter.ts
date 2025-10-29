import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  BaseDomainException,
  DomainValidationException,
} from '@airlineshub/domains/exceptions';

// TODO: Colocar na lib shared
@Catch(BaseDomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: BaseDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof DomainValidationException) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation Error: ${exception.message}`;
    } else if (exception instanceof BaseDomainException) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = `Domain Error: ${exception.message}`;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error:
        status === HttpStatus.BAD_REQUEST
          ? 'Validation Failed'
          : 'Domain Error',
    });
  }
}
