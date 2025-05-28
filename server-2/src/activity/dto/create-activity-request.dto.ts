import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateActivityRequestDTO {
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
}
