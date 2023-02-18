import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { FeiShuController } from "./feishu/feishu.controller";
import { FeiShuService } from "./feishu/feishu.service";
import { UserProviders } from './user.providers';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [UserController, FeiShuController],
  providers: [...UserProviders, UserService, FeiShuService],
  exports: [UserService]
})
export class UserModule {}
