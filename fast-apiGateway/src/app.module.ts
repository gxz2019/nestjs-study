import { Module, CacheModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { getConfig } from "./utils";
import * as redisStore from 'cache-manager-redis-store';

const config = {
  socket: {
    host: getConfig('REDIS_CONFIG').host,
    port: getConfig('REDIS_CONFIG').port,
  },
  db: getConfig('REDIS_CONFIG').db,
}

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      db: getConfig('REDIS_CONFIG').db,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
