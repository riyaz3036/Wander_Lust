import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class TourFilterDTO {
    @IsOptional()
    @IsString()
    startPrice?: string;

    @IsOptional()
    @IsString()
    endDate?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    vacancy?: number;
}
