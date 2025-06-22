import { ApiProperty } from "@nestjs/swagger";
import { SuccessObjectResponseDTO } from "src/common/dtos/success-object-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { BookingResponseDTO } from "../booking-response.dto";


export class BookingSuccessResponse extends SuccessObjectResponseDTO<BookingResponseDTO> {
  @ApiProperty({ type: BookingResponseDTO })
  data: BookingResponseDTO;

  constructor(
    data: BookingResponseDTO,
    status: ApiResponseStatus
  ) {
    super(data);
    this.data = data;
    this.setStatus(status);
  }
}
