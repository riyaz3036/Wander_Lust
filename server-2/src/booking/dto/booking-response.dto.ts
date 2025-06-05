import { IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty, IsMongoId } from 'class-validator';
import { ActivityResponseDTO } from 'src/activity/dto/activity-response.dto';
import { TourResponseDTO } from 'src/tour/dto/tour-response.dto';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';

export class BookingResponseDTO {
  @IsString()
  id: string;

  user: UserResponseDTO;

  tour: TourResponseDTO;

  @IsArray()
  signed_activities: ActivityResponseDTO[];

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

