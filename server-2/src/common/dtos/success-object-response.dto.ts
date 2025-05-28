import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseStatus } from '../enums/api-response-status.enum';

export class SuccessObjectResponseDTO<T> {
  @ApiProperty()
  private data: T;

  @ApiProperty()
  private status: ApiResponseStatus;

  constructor(data: T) {
    this.data = data;
    this.status = ApiResponseStatus.SUCCESS;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
  }

  public getStatus(): ApiResponseStatus {
    return this.status;
  }

  public setStatus(status: ApiResponseStatus): void {
    this.status = status;
  }
}
