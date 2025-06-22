import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { UserResponseDTO } from "../user-response.dto";


export class UserSuccessResponse extends SuccessObjectResponseDTO<UserResponseDTO> {
  @ApiProperty({ type: UserResponseDTO })
  data: UserResponseDTO;

  constructor(
    data: UserResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
