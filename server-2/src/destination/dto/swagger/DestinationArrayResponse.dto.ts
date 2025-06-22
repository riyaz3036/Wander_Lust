import { ApiProperty } from "@nestjs/swagger";
import { SuccessArrayResponseDTO } from "src/common/dtos/success-array-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { DestinationResponseDTO } from "../destination-response.dto";


export class DestinationArrayResponse extends SuccessArrayResponseDTO<DestinationResponseDTO> {
  @ApiProperty({ type: [DestinationResponseDTO] })
  data: DestinationResponseDTO[];

  constructor(
    data: DestinationResponseDTO[],
    count: number,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
