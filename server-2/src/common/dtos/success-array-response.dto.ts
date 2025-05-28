import { ApiProperty } from "@nestjs/swagger";
import { ApiResponseStatus } from "../enums/api-response-status.enum";
import { isArray } from "class-validator";

export class SuccessArrayResponseDTO<T> {
  @ApiProperty({ isArray: true })
  private data: T;
  @ApiProperty()
  private count: number;
  @ApiProperty()
  status: ApiResponseStatus;

  public getCount(): number {
    return this.count;
  }

  public setCount(count: number): void {
    this.count = count;
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

  constructor(data: T) {
    this.data = data;
    this.count = isArray(data) ? data.length : 1;
    this.status = ApiResponseStatus.SUCCESS;
  }
}
