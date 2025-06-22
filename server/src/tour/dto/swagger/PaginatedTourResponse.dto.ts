import { ApiProperty } from "@nestjs/swagger";
import { SuccessPaginatedResponseDTO } from "src/common/dtos/success-paginated-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { TourResponseDTO } from "src/tour/dto/tour-response.dto";


export class PaginatedTourResponseDTO extends SuccessPaginatedResponseDTO<TourResponseDTO> {
  @ApiProperty({ type: [TourResponseDTO] })
  data: TourResponseDTO[];

  constructor(
    data: TourResponseDTO[],
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
