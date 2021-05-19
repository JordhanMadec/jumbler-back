import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = app.get(ConfigService);

  const port = config.get<number>('port');
  const environment = config.get<string>('environment');

  await app.listen(port).then(() => {
    Logger.log('App listening at http://localhost:' + port);
    Logger.log('Running in ' + environment + ' mode');
  });
}

bootstrap();
