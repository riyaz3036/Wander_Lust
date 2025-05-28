import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinationDTO } from './create-destination.dto';

export class UpdateDestinationDTO extends PartialType(CreateDestinationDTO) {}
