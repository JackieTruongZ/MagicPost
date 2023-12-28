import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(3333);
}
bootstrap(); 
