import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TourByDestFilterDTO{  
  @IsNotEmpty()
  @ApiProperty()
  dest_id: string[];
}
