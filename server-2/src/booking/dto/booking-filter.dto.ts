import { IsOptional, IsArray } from 'class-validator';

export class BookingFilterDTO {
  @IsOptional()
  @IsArray()
  user_id?: string[];
}
