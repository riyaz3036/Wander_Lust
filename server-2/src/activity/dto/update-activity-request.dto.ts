import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityRequestDTO } from './create-activity-request.dto';

export class UpdateActivityRequestDTO extends PartialType(CreateActivityRequestDTO) {}
