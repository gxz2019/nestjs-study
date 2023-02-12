import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeiShuController } from './feishu/feishu.controller';
import { FeiShuService } from './feishu/feishu.service';

@Module({
  controllers: [UserController, FeiShuController],
  providers: [UserService, FeiShuService]
})
export class UserModule {}
