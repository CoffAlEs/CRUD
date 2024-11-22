import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true, // Permite que las cookies se envíen en solicitudes entre sitios
  };

  app.enableCors(corsOptions);

  await app.listen(5000); // Puerto de backend
}

bootstrap();
