import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConsumerModule } from './consumer.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ConsumerModule);
  const configService = appContext.get(ConfigService);
  
  const rabbitMQConfig = configService.get('rabbitmq');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ConsumerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQConfig.urls],
        queue: rabbitMQConfig.queue,
        queueOptions: rabbitMQConfig.queueOptions,
      },
    },
  );

  app.listen();

  process.on('SIGTERM', async () => {
    console.log('Graceful shutdown initiated');
    await app.close();
  });

  process.on('SIGINT', async () => {
    console.log('Graceful shutdown initiated');
    await app.close();
  });
}

bootstrap();
