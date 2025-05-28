import { IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator';
import { TourResponseDTO } from 'src/tour/dto/tour-response.dto';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';

export class BookingResponseDTO {
  @IsString()
  id: string;

  user: UserResponseDTO;

  tour: TourResponseDTO;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  signed_activities: string[];

  @IsNumber()
  price: number;

  @IsString()
  bookFor: string;

  @IsNumber()
  guestSize: number;

  constructor(data: BookingResponseDTO) {
    Object.assign(this, data);
  }
}

