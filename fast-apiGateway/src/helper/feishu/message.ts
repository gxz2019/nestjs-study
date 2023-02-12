import { requestFeishu } from 'src/utils';

enum RECEIVE_TYPE { 'open_id', 'user_id', 'union_id', 'email', 'chat_id' }
enum MSG_TYPE { text, post, image, file, audio, media, sticker, interactive, share_chat, share_user };
type MESSAGES_PARAMS = {
  receive_id: string
  content: string
  msg_type: MSG_TYPE
}

const sendMessagesToFeiShu = async (receive_id_type: RECEIVE_TYPE, params: MESSAGES_PARAMS, app_token: string) => {
  const res: any = await requestFeishu({
    url: `/im/v1/messages`,
    method: 'POST',
    query: {receive_id_type },
    params,
    headers: {
      Authorization: `Bearer ${app_token}`,
    },
  });
  return res.data;
};

export {
  RECEIVE_TYPE, 
  MSG_TYPE,
  sendMessagesToFeiShu,
}