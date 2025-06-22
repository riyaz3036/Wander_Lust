import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateBookingRequestDTO {
  @ApiProperty()
  @IsMongoId()
  user_id: string;

  @ApiProperty()
  @IsMongoId()
  tour_id: string;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  signed_activities: string[];

  @ApiProperty()
  @IsNumber()

  
  price: number;

  @ApiProperty()
  @IsString()
  bookFor: string;

  @ApiProperty()
  @IsNumber()
  guestSize: number;
}

