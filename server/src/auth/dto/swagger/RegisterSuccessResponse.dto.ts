import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { LoginResponseDTO } from "../login-response.dto";


export class LoginSuccessResponse extends SuccessObjectResponseDTO<LoginResponseDTO> {
  @ApiProperty({ type: LoginResponseDTO })
  data: LoginResponseDTO;

  constructor(
    data: LoginResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
