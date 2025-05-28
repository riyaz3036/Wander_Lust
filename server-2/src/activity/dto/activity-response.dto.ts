import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivityResponseDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  dest_id: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(data: ActivityResponseDTO) {
    Object.assign(this, data);
  }
}
