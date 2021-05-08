import { HttpModule, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
