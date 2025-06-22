import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ActivityResponseDTO } from 'src/activity/dto/activity-response.dto';
import { TourResponseDTO } from 'src/tour/dto/tour-response.dto';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';

export class BookingResponseDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => UserResponseDTO })
  user: UserResponseDTO;

  @ApiProperty({ type: () => TourResponseDTO })
  tour: TourResponseDTO;

  @ApiProperty({ type: () => [ActivityResponseDTO] })
  signed_activities: ActivityResponseDTO[];

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  bookFor: string;

  @ApiProperty()
  @IsNumber()
  guestSize: number;

  constructor(data: BookingResponseDTO) {
    Object.assign(this, data);
  }
}

