import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityRequestDTO } from './create-activity-request.dto';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateActivityRequestDTO {
      @IsString()
      @ApiProperty({required: false})
      @IsNotEmpty()
      title?: string;
    
      @IsMongoId()
      @ApiProperty({required: false})
      @IsNotEmpty()
      dest_id?: string;
    
      @IsNumber()
      @ApiProperty({required: false})
      price?: number;
    
      @IsString()
      @ApiProperty({required: false})
      @IsNotEmpty()
      description?: string;
}
