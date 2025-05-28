import { IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator';

export class CreateBookingRequestDTO {
  @IsMongoId()
  user_id: string;

  @IsMongoId()
  tour_id: string;

  @IsArray()
  @IsMongoId({ each: true })
  signed_activities: string[];

  @IsNumber()
  price: number;

  @IsString()
  bookFor: string;

  @IsNumber()
  guestSize: number;
}

