import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateActivityRequestDTO {
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
}
