import { getConfig } from 'src/utils';

const feishuConfig = getConfig().FEISHU_CONFIG;
const APP_ID = feishuConfig.FEISHU_APP_ID;
const APP_SECRET = feishuConfig.FEISHU_APP_SECRET;

export {
  APP_ID,
  APP_SECRET,
}