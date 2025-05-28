import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateDestinationDTO {
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
}
