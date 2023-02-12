import { Body, Controller, Post, Version, VERSION_NEUTRAL } from "@nestjs/common";
import { FeishuMessageDto } from "./feishu.dto";
import { FeiShuService } from "./feishu.service";

@Controller('feishu')
class FeiShuController {
  constructor(private feiShuService: FeiShuService) { }

  @Version([VERSION_NEUTRAL])
  @Post('sendMessage')
  sendMessage(@Body() parmas: FeishuMessageDto) {
    const { receive_id_type, ...rest} = parmas;
    return this.feiShuService.sendMessage(receive_id_type, rest);
  }
}

export {
  FeiShuController
}