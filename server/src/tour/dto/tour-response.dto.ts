// create-tour.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber
  , IsOptional } from 'class-validator';
import { DestinationResponseDTO } from 'src/destination/dto/destination-response.dto';

export class TourResponseDTO {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  image?: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  duration: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  capacity: number;

  @IsNumber()
  @ApiProperty()
  vacancy: number;

  @ApiProperty()
  start_date: Date;

  @ApiProperty({type: () => [DestinationResponseDTO]})
  destinations: DestinationResponseDTO[];

  constructor(data: TourResponseDTO) {
    Object.assign(this, data);
  }
}