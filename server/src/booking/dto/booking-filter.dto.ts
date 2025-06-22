import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray } from 'class-validator';

export class BookingFilterDTO {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  user_id?: string[];
}
