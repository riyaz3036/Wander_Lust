import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ActivityFilterDTO {
  @IsOptional()
  @ApiProperty()
  @IsArray()
  dest_id?: string[];

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  startPrice?: number;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  endPrice?: number;
}
