import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDestinationDTO {
    @IsNotEmpty()
    @ApiProperty({required: false})
    @IsString()
    title?: string;

    @IsNotEmpty()
    @ApiProperty({required: false})
    @IsMongoId()
    tour_id?: string;

    @IsNotEmpty()
    @ApiProperty({required: false})
    @IsString()
    description?: string;
}
