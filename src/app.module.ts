import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { configuration } from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
