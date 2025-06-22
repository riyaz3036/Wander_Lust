import { ApiProperty } from "@nestjs/swagger";
import { SuccessPaginatedResponseDTO } from "src/common/dtos/success-paginated-response.dto";
import { ApiResponseStatus } from "src/common/enums/api-response-status.enum";
import { UserResponseDTO } from "../user-response.dto";


export class PaginatedUserResponseDTO extends SuccessPaginatedResponseDTO<UserResponseDTO> {
  @ApiProperty({ type: [UserResponseDTO] })
  data: UserResponseDTO[];

  constructor(
    data: UserResponseDTO[],
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
