// create-tour.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateTourRequestDTO {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  capacity: number;

  @Type(() => Number)
  @IsNumber()
  vacancy: number;

  @IsDateString()
  start_date: string;
}