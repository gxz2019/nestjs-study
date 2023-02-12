import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { BusinessException } from "src/common/exceptions/business.exception";
import { getAppToken, sendMessagesToFeiShu } from "src/helper/feishu";

@Injectable()
class FeiShuService {
  private APP_TOKEN_CACHE_KEY;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}
  async getAppToken(): Promise<string> {
    //判断缓存中是否已经有 token
    let appToken: string = await this.cacheManager.get(
      this.APP_TOKEN_CACHE_KEY
    );
    if (!appToken) {
      const res = await getAppToken();
      const { code, app_access_token, expire } = res;
      if (code === 0) {
        // token 有效期为 2 小时，
        // 在此期间调用该接口 token 不会改变。
        // 当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，
        // 会生成一个新的 token，与此同时老的 token 依然有效。
        appToken = app_access_token;
        this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          app_access_token,
          expire - 60
        );
      } else {
        throw new BusinessException("get token in feishu failed");
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, parmas) {
    const app_token = await this.getAppToken();
    return sendMessagesToFeiShu(receive_id_type, parmas, app_token);
  }
}

export { FeiShuService };
