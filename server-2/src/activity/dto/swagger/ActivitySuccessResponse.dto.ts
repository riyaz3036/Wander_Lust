import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { ActivityResponseDTO } from "../activity-response.dto";


export class ActivitySuccessResponse extends SuccessObjectResponseDTO<ActivityResponseDTO> {
  @ApiProperty({ type: ActivityResponseDTO })
  data: ActivityResponseDTO;

  constructor(
    data: ActivityResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
