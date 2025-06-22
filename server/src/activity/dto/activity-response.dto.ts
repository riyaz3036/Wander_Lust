import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivityResponseDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @ApiProperty()
  @IsNotEmpty()
  dest_id: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  constructor(data: ActivityResponseDTO) {
    Object.assign(this, data);
  }
}
