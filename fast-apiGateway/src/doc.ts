/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
//@ts-ignore
import * as packageConfig from "../package.json";

const generateDocument = (app) => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/api/doc", app, doc);
};

export { generateDocument };
