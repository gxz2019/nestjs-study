import { requestFeishu } from "src/utils";
import { APP_ID, APP_SECRET } from "./constants";

interface FeiShuAppTokenRes {
  code: number;
  app_access_token: string;
  expire: number;
}

const getAppToken = async () => {
  const res: any = await requestFeishu({
    url: "/auth/v3/app_access_token/internal",
    method: "POST",
    params: {
      app_id: APP_ID,
      app_secret: APP_SECRET,
    },
  });
  return res.data;
};

//get user_access_token with code 
const getUserToken = async ({ code, access_token }: { code: string, access_token: string }) => {
  //code -> 预授权码
  let res;
  try {
    res = await requestFeishu({
      url: `/authen/v1/access_token`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: {
        code,
        grant_type: "authorization_code"
      }
    });
    return res;
  } catch(error) {
    console.log(error, 'get user_access_token failed');
  }
}
export { getAppToken, getUserToken };
