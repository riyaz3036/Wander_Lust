import { ApiProperty } from "@nestjs/swagger";
import { SuccessPaginatedResponseDTO } from "src/common/dtos/success-paginated-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { DestinationResponseDTO } from "../destination-response.dto";


export class PaginatedDestinationResponseDTO extends SuccessPaginatedResponseDTO<DestinationResponseDTO> {
  @ApiProperty({ type: [DestinationResponseDTO] })
  data: DestinationResponseDTO[];

  constructor(
    data: DestinationResponseDTO[],
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
