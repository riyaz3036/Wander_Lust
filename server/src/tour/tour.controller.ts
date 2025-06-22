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
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { CreateTourRequestDTO } from './dto/create-tour-request.dto';
import { TourFilterDTO } from './dto/tour-filter.dto';
import { UpdateTourRequestDTO } from './dto/update-tour-request.dto';
import { TourService } from './tour.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TourSuccessResponse } from './dto/swagger/TourSuccessResponse.dto';
import { PaginatedTourResponseDTO } from './dto/swagger/PaginatedTourResponse.dto';
import { Roles } from 'src/common/decorators/role-access.decorator';


@ApiTags('Tour')
@ApiBearerAuth()
@Controller(RouteConstants.TOUR)
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @ApiOperation({ summary: 'Add a new tour' })
  @ApiOkResponse({
      description: 'Created Tour response',
      type: TourSuccessResponse,
    })
  @ApiBody({type: CreateTourRequestDTO})
  @UseGuards(JwtAuthGuard)
  @Roles()
  @Post(RouteConstants.ADD_TOUR)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTourDto: CreateTourRequestDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const result = await this.tourService.createTour(createTourDto, file);
    return new SuccessObjectResponseDTO(result);
  }



  @ApiOperation({ summary: 'Fetch all tours' })
  @ApiOkResponse({
      description: 'Paginated tour response',
      type: PaginatedTourResponseDTO,
    })
  @Get(RouteConstants.GET_ALL_TOURS)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'filters', required: false, type: TourFilterDTO})
  async findAll(
    @Query() filters: TourFilterDTO,
    @Query('page') page = '1',
    @Query('size') size = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);
    const tours = await this.tourService.findAllPaginatedTours(filters, pageNum, sizeNum);
    return new SuccessPaginatedResponseDTO(tours.data, pageNum, sizeNum, tours.total);
  }



  @ApiOperation({ summary: 'Fetch a tour by ID' })
  @ApiOkResponse({
      description: 'Fetched tour response',
      type: TourSuccessResponse,
    })
  @ApiParam({ name: 'id', required: true, type: String })
  @Get(RouteConstants.GET_TOUR_BY_ID)
  async findOne(@Param('id') id: string) {
    const tour = await this.tourService.findTour(id);
    return new SuccessObjectResponseDTO(tour);
  }



  @ApiOperation({ summary: 'Update a tour by ID' })
   @ApiOkResponse({
    description: 'Updated tour response',
    type: TourSuccessResponse,
  })
  @ApiBody({type: UpdateTourRequestDTO})
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Patch(RouteConstants.UPDATE_TOUR_BY_ID)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourRequestDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const updated = await this.tourService.updateTour(id, updateTourDto, file);
    return new SuccessObjectResponseDTO(updated);
  }



  
  @ApiOperation({ summary: 'Delete a tour by ID' })
  @ApiOkResponse({
    type: SuccessMessageResponseDTO,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(RouteConstants.DELETE_TOUR_BY_ID)
  async remove(@Param('id') id: string) {
    const deleted = await this.tourService.removeTour(id);
    return new SuccessMessageResponseDTO(deleted);
  }
}
