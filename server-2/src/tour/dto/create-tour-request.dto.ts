// create-tour.dto.ts
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateTourRequestDTO {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsNumber()
  price: number;

  @IsNumber()
  capacity: number;

  @IsNumber()
  vacancy: number;

  @IsDateString()
  start_date: string;
}