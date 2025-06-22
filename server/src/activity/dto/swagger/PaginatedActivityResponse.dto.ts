import { ApiProperty } from "@nestjs/swagger";
import { ActivityResponseDTO } from "src/activity/dto/activity-response.dto";
import { SuccessPaginatedResponseDTO } from "src/common/dtos/success-paginated-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";


export class PaginatedActivityResponseDTO extends SuccessPaginatedResponseDTO<ActivityResponseDTO> {
  @ApiProperty({ type: [ActivityResponseDTO] })
  data: ActivityResponseDTO[];

  constructor(
    data: ActivityResponseDTO[],
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
