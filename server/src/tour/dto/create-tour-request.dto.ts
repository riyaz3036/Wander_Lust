// create-tour.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateTourRequestDTO {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  duration: string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  capacity: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  vacancy: number;

  @IsDateString()
  @ApiProperty()
  start_date: string;
}