// create-tour.dto.ts
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { DestinationResponseDTO } from 'src/destination/dto/destination-response.dto';

export class TourResponseDTO {
  @IsString()
  id: string;

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

  start_date: Date;

  destinations: DestinationResponseDTO[];

  constructor(data: TourResponseDTO) {
    Object.assign(this, data);
  }
}