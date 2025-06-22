import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { DestinationResponseDTO } from "../destination-response.dto";


export class DestinationSuccessResponse extends SuccessObjectResponseDTO<DestinationResponseDTO> {
  @ApiProperty({ type: DestinationResponseDTO })
  data: DestinationResponseDTO;

  constructor(
    data: DestinationResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
