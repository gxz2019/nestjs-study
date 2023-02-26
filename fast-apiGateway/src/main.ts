import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { AllExceptionsFilter } from "./common/exceptions/base.exception.filter";
import { HttpExceptionFilter } from "./common/exceptions/http.exception.filter";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { VersioningType, VERSION_NEUTRAL, ValidationPipe } from "@nestjs/common";
import { generateDocument } from "./doc";
// import { CustomizeLogger } from './common/logger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(
      {
        logger: true
      }
    )
  );

  //接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, "1", "2"],
    type: VersioningType.URI,
  });

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  //创建文档
  generateDocument(app);
  
  //全局字段校验
  app.useGlobalPipes(new ValidationPipe())

  //添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
