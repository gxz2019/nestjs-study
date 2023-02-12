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

export { getAppToken };
