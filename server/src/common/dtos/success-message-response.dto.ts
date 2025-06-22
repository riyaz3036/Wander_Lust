import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseStatus } from '../enums/api-response-status.enum';

export class SuccessMessageResponseDTO {
  @ApiProperty()
  private message: string;

  @ApiProperty()
  private status: ApiResponseStatus;

  constructor(message: string) {
    this.message = message
    this.status = ApiResponseStatus.SUCCESS;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getStatus(): ApiResponseStatus {
    return this.status;
  }

  public setStatus(status: ApiResponseStatus): void {
    this.status = status;
  }
}
