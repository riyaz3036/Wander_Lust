import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray } from 'class-validator';

export class DestinationFilterDTO {
  @IsOptional()
  @ApiProperty()
  @IsArray()
  tour_id?: string[];
}

