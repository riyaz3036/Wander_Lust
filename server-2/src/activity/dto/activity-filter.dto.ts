import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ActivityFilterDTO {
  @IsOptional()
  @IsArray()
  dest_id?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  startPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  endPrice?: number;
}
