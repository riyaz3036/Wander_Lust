import { SuccessPaginatedResponseDTO } from "src/common/dtos/success-paginated-response.dto";
import { BookingResponseDTO } from "../booking-response.dto";
import { ApiProperty, ApiExtraModels } from "@nestjs/swagger";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { UserResponseDTO } from "src/user/dto/user-response.dto";
import { TourResponseDTO } from "src/tour/dto/tour-response.dto";
import { ActivityResponseDTO } from "src/activity/dto/activity-response.dto";


@ApiExtraModels(BookingResponseDTO, UserResponseDTO, TourResponseDTO, ActivityResponseDTO)
export class PaginatedBookingsResponseDTO extends SuccessPaginatedResponseDTO<BookingResponseDTO> {
  @ApiProperty({ type: [BookingResponseDTO] })
  data: BookingResponseDTO[];

  constructor(
    data: BookingResponseDTO[],
    totalElements: number,
    page: number,
    size: number,
    status: ApiResponseStatus
  ) {
    super(data, page, size, totalElements);
    this.data = data;
    this.setStatus(status);
  }
}
