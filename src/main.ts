import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
      origin: '*',
    },
    logger: new Logger(),
  });

  await app.listen(8080);
}
bootstrap();
