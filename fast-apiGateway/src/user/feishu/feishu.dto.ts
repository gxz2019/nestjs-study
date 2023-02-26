import { RECEIVE_TYPE, MSG_TYPE } from "src/helper/feishu";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";

class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: "email", enum: RECEIVE_TYPE })
  receive_id_type: RECEIVE_TYPE;

  @IsNotEmpty()
  @ApiProperty({ example: "xxxxx@xxx" })
  receive_id?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '{"text":" test content"}' })
  content?: string;

  @IsNotEmpty()
  @IsEnum(MSG_TYPE)
  @ApiProperty({ example: "text", enum: MSG_TYPE })
  msg_type?: MSG_TYPE;
}

class FeishuTokenDto {
  @ApiProperty({ example: "xxxx", description: 'feishu code'})
  code: string;
}

export {
  FeishuMessageDto,
  FeishuTokenDto,
}
