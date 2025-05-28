import { IsOptional, IsArray } from 'class-validator';

export class DestinationFilterDTO {
  @IsOptional()
  @IsArray()
  tour_id?: string[];
}
