import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ToursByDestsFiltersDTO {
  @IsOptional()
  @IsArray()
  @ApiProperty()
  @IsString({ each: true })
  @Type(() => String)
  dest_id: string[];
}
