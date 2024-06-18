import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
      origin: '*',
    },
  });

  await app.listen(8080);
}
bootstrap();
