import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from 'config/configuration';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: `${process.cwd()}/config/env/${
        process.env.NODE_ENV
      }.env`,
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/test-client`,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
