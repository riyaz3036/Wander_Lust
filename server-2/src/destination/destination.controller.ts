import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { DestinationService } from './destination.service';
import { CreateDestinationDTO } from './dto/create-destination.dto';
import { DestinationFilterDTO } from './dto/destination-filter.dto';
import { UpdateDestinationDTO } from './dto/update-destination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Destination')
@ApiBearerAuth()
@Controller(RouteConstants.DESTINATION)
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a new destination' })
  @Post(RouteConstants.ADD_DESTINATION)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDestinationDTO,
  ) {
    const image = file ? file.path : null;
    const result = await this.destinationService.createDestination({ ...body, image });
    return new SuccessObjectResponseDTO(result);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch all destinations' })
  @Get(RouteConstants.GET_ALL_DESTINATIONS)
  async findAll(
    @Query() filters: DestinationFilterDTO,
    @Query('page') page = '1',
    @Query('size') size = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);
    const destinations = await this.destinationService.findAllPaginatedDestinations(filters, pageNum, sizeNum);
    return new SuccessPaginatedResponseDTO(destinations.data, pageNum, sizeNum, destinations.total);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch a destination by ID' })
  @Get(RouteConstants.GET_DESTINATION_BY_ID)
  async findOne(@Param('id') id: string) {
    const destination = await this.destinationService.findDestination(id);
    return new SuccessObjectResponseDTO(destination);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a destination by ID' })
  @Patch(RouteConstants.UPDATE_DESTINATION_BY_ID)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateDestinationDTO,
  ) {
    if (file) {
      body.image = file.path;
    }
    const updated = await this.destinationService.updateDestination(id, body);
    return new SuccessObjectResponseDTO(updated);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a destination by ID' })
  @Delete(RouteConstants.DELETE_DESTINATION_BY_ID)
  async remove(@Param('id') id: string) {
    const deleted = await this.destinationService.removeDestination(id);
    return new SuccessMessageResponseDTO(deleted);
  }
}
