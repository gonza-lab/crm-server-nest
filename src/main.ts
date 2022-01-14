import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigService);

  await app.listen(configurationService.get<number>('PORT') || 3000);
}
bootstrap();
