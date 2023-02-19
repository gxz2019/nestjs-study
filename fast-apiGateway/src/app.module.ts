import { Module, CacheModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { getConfig } from "./utils";
import { redisStore } from 'cache-manager-redis-store';

const config = {
  socket: {
    host: getConfig('REDIS_CONFIG').host,
    port: getConfig('REDIS_CONFIG').port,
  },
  //@ts-ignore
  db: getConfig('REDIS_CONFIG').db,
  // ttl: 600
}

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      //@ts-ignore
      store: async () => await redisStore(config),
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
