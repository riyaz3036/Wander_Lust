import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { ActivityResponseDTO } from 'src/activity/dto/activity-response.dto';

export class DestinationResponseDTO{  
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsMongoId()
  tour_id: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string | null;

  activities: ActivityResponseDTO[];

  constructor(data: DestinationResponseDTO) {
    Object.assign(this, data);
  }
}
