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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { DestinationService } from './destination.service';
import { CreateDestinationDTO } from './dto/create-destination.dto';
import { DestinationFilterDTO } from './dto/destination-filter.dto';
import { UpdateDestinationDTO } from './dto/update-destination.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessArrayResponseDTO } from 'src/common/dtos/success-array-response.dto';
import { ToursByDestsFiltersDTO } from './dto/tours-by-dests.filter.dto';
import { DestinationSuccessResponse } from './dto/swagger/DestinationSuccessResponse.dto';
import { PaginatedDestinationResponseDTO } from './dto/swagger/PaginatedDestinationResponse.dto';
import { DestinationArrayResponse } from './dto/swagger/DestinationArrayResponse.dto';
import { TourByDestFilterDTO } from './dto/tours-by-destination.filter.dto';

@ApiTags('Destination')
@ApiBearerAuth()
@Controller(RouteConstants.DESTINATION)
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}


  @ApiOperation({ summary: 'Add a new destination' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
      description: 'Created Destination response',
      type: DestinationSuccessResponse,
    })
  @ApiBody({type: CreateDestinationDTO})
  @Post(RouteConstants.ADD_DESTINATION)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() body: CreateDestinationDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const result = await this.destinationService.createDestination(body, file);
    return new SuccessObjectResponseDTO(result);
  }


  @ApiOperation({ summary: 'Fetch all destinations' })
  @ApiOkResponse({
      description: 'Paginated destination response',
      type: PaginatedDestinationResponseDTO,
    })
  @Get(RouteConstants.GET_ALL_DESTINATIONS)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'filters', required: false, type: DestinationFilterDTO})
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


  @ApiOperation({ summary: 'Fetch all destinations' })
  @ApiOkResponse({
      description: 'all destinations response',
      type: DestinationArrayResponse,
    })
  @ApiQuery({ name: 'filters', required: false, type: DestinationFilterDTO})
  @Get(RouteConstants.GET_ALL_DESTINATIONS_WITHOUT_PAGINATION)
  async findAllWithoutPagination(
    @Query() filters: DestinationFilterDTO
  ) {
    const destinations = await this.destinationService.findAllDestinations(filters);
    return new SuccessArrayResponseDTO(destinations.data);
  }



  @ApiOperation({ summary: 'Fetch all tours by destination ids' })
  @Post(RouteConstants.GET_ALL_TOURS_WITH_DEST_IDS)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'filters', required: false, type: TourByDestFilterDTO})
  async findToursByDestIds(
    @Body() filters: TourByDestFilterDTO,
    @Query('page') page = '1',
    @Query('size') size = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);
    const tours = await this.destinationService.findToursByDestIds(filters.dest_id, pageNum, sizeNum);
    return new SuccessPaginatedResponseDTO(tours.data, pageNum, sizeNum, tours.total);
  }
  


  @ApiOperation({ summary: 'Fetch a destination by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Fetched destination response',
    type: DestinationSuccessResponse,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @Get(RouteConstants.GET_DESTINATION_BY_ID)
  async findOne(@Param('id') id: string) {
    const destination = await this.destinationService.findDestination(id);
    return new SuccessObjectResponseDTO(destination);
  }


  @ApiOperation({ summary: 'Update a destination by ID' })
  @ApiOkResponse({
    description: 'Updated destination response',
    type: DestinationSuccessResponse,
  })
  @ApiBody({type: UpdateDestinationDTO})
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Patch(RouteConstants.UPDATE_DESTINATION_BY_ID)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDestinationDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const updated = await this.destinationService.updateDestination(id, body, file);
    return new SuccessObjectResponseDTO(updated);
  }


  
  @ApiOperation({ summary: 'Delete a destination by ID' })
  @ApiOkResponse({
    type: SuccessMessageResponseDTO,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(RouteConstants.DELETE_DESTINATION_BY_ID)
  async remove(@Param('id') id: string) {
    const deleted = await this.destinationService.removeDestination(id);
    return new SuccessMessageResponseDTO(deleted);
  }
}
