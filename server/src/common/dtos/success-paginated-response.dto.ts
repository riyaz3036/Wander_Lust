import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseStatus } from '../enums/api-response-status.enum';
import { isArray } from 'class-validator';

export class SuccessPaginatedResponseDTO<T> {
  @ApiProperty({ isArray: true })
  protected data: T[];

  @ApiProperty()
  protected totalElements: number;

  @ApiProperty()
  protected page: number;

  @ApiProperty()
  protected size: number;

  @ApiProperty()
  protected status: ApiResponseStatus;

  constructor(data: T[], page = 1, size = 10, total: number) {
    this.data = data;
    this.totalElements = total;
    this.page = page;
    this.size = size;
    this.status = ApiResponseStatus.SUCCESS;
  }

  public getData(): T[] {
    return this.data;
  }

  public setData(data: T[]): void {
    this.data = data;
    this.totalElements = isArray(data) ? data.length : 1;
  }

  public getTotalElements(): number {
    return this.totalElements;
  }

  public setTotalElements(totalElements: number): void {
    this.totalElements = totalElements;
  }

  public getPage(): number {
    return this.page;
  }

  public setPage(page: number): void {
    this.page = page;
  }

  public getSize(): number {
    return this.size;
  }

  public setSize(size: number): void {
    this.size = size;
  }

  public getStatus(): ApiResponseStatus {
    return this.status;
  }

  public setStatus(status: ApiResponseStatus): void {
    this.status = status;
  }
}
