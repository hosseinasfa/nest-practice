import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
    .setTitle('Ghadir pool')
    .setDescription('The pool API description')
    .setVersion('1.0')
    .addTag('pool')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,DELETE,PUT'
  });
  app.use(helmet());

    await app.listen(3000);
}

bootstrap();
