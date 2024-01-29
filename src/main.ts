import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);


    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(
      process.env.API_PREFIX || '/api/v1',
    );

    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Core API')
        .addServer(
          process.env.SWAGGER_BASE_URI ||
            'http://localhost/api/v1',
        )
        .setDescription('The Core service API description')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('core')
        .addBearerAuth()
        .addBasicAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(
        `${process.env.API_PREFIX}docs` ||
          '/api/v1/docs',
        app,
        document,
      );
    }

    app.enableCors();

    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIoAdapter);

    await app.listen(port);
    Logger.log(
      `🚀 Affiliate service running on http://localhost:${port} in ${process.env.NODE_ENV} version: 1.0`,
      'Bootstrap',
    );
  } catch (error) {
    console.error(`Failed to initialize, due to ${error}`);
    process.exit(1);
  }
}
bootstrap();
