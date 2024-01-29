/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';

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
  ],
})
export class TasksModule {}
