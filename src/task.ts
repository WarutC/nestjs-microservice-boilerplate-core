import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(TasksModule);

}

bootstrap();
