import { FastifyReply, FastifyRequest } from "fastify";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BusinessException } from "./business.exception";

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      response.status(HttpStatus.OK).send({
        data: null,
        status: error["code"],
        extra: {},
        message: error["message"],
        success: false,
      });
    }

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}

export { HttpExceptionFilter };
