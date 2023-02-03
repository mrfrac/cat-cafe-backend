import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageInfo from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const apiPrefix = configService.get<string>('apiPrefix', 'api');
  const useOpenApi = configService.get<boolean>('useOpenApi', false);

  if (useOpenApi) {
    const options = new DocumentBuilder()
      .setTitle(packageInfo.name)
      .setDescription(`${packageInfo.name} API`)
      .setVersion(packageInfo.version)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${apiPrefix}/openapi`, app, document);
  }

  app.setGlobalPrefix(apiPrefix);
  await app.listen(configService.get<number>('port') || 3000);
}

bootstrap();
