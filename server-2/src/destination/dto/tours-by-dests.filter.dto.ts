import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ToursByDestsFiltersDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  dest_id: string[];
}
