import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateDestinationDTO {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  tour_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  description: string;
}
