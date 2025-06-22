import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { ActivityResponseDTO } from 'src/activity/dto/activity-response.dto';

export class DestinationResponseDTO{  
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  id: string;

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

  @IsOptional()
  @ApiProperty({required: false})
  @IsString()
  image?: string | null;

  @ApiProperty()
  activities: ActivityResponseDTO[];

  constructor(data: DestinationResponseDTO) {
    Object.assign(this, data);
  }
}
