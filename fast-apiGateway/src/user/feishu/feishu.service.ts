import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { BusinessException } from "src/common/exceptions/business.exception";
import { getAppToken, sendMessagesToFeiShu, getUserToken } from "src/helper/feishu";
import { getConfig } from "src/utils";

@Injectable()
class FeiShuService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) { 
  }
  async getAppToken(): Promise<string> {
    //判断缓存中是否已经有 token
    let appToken: string = '';
    try {
      appToken = await this.cacheManager.get(
        'APP_TOKEN_CACHE_KEY'
      );
    } catch (error) {
      console.log(error, 'get feishu token in cache cause error');
    }
    if (!appToken) {
      console.log('no feishu token cache with reRequest................................')
      try {
        let res = null;
        try {
          res = await getAppToken();
        } catch (error) {
          console.log(error, 'get app token');
        }
        const { code, app_access_token, expire } = res;
        if (code === 0) {
          // token 有效期为 2 小时，
          // 在此期间调用该接口 token 不会改变。
          // 当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，
          // 会生成一个新的 token，与此同时老的 token 依然有效。
          appToken = app_access_token;
          try {
            this.cacheManager?.set(
              'APP_TOKEN_CACHE_KEY',
              appToken,
              {
                ttl: (expire - 60) * 1000 //redis's ttl  unit s, cacheManager's ttl unit us
              }
            );
          } catch (error) {
            console.log(error, 'set new feishu token to cache failed');
          }

        } else {
          throw new BusinessException("get token in feishu failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, parmas) {
    let app_token = '';
    try {
      app_token = await this.getAppToken();
    } catch (error) {
      console.log(error, 'get feishu token failed');
    }
    try {
      return sendMessagesToFeiShu(receive_id_type, parmas, app_token);
    } catch (error) {
      console.log(error, 'send msg to feishu failed');
    }
  }

  async getUserToken(code: string) {
    const access_token = await this.getAppToken();
    console.log(access_token, code, 'access_token')
    const res: any = await getUserToken(
      {
        code,
        access_token,
      }
    );
    return res;
  }
}

export { FeiShuService };
