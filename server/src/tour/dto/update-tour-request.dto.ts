// update-tour.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTourRequestDTO } from './create-tour-request.dto';

export class UpdateTourRequestDTO extends PartialType(CreateTourRequestDTO) {}