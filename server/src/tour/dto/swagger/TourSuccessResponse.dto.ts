import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { TourResponseDTO } from "../tour-response.dto";


export class TourSuccessResponse extends SuccessObjectResponseDTO<TourResponseDTO> {
  @ApiProperty({ type: TourResponseDTO })
  data: TourResponseDTO;

  constructor(
    data: TourResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
