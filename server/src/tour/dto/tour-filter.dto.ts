import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class TourFilterDTO {
    @IsOptional()
    @IsString()
    @ApiProperty()
    startPrice?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    endDate?: string;

    @IsOptional()
    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    vacancy?: number;

    @IsOptional()
    @ApiProperty()
    ids: string[];
}
