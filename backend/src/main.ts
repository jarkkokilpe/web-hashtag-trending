import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS
  app.use(compression());
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((err) => console.error(err));
