import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { CountResponseDTO } from "../count-response.dto";


export class CountSuccessResponse extends SuccessObjectResponseDTO<CountResponseDTO> {
  @ApiProperty({ type: CountResponseDTO })
  data: CountResponseDTO;

  constructor(
    data: CountResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
