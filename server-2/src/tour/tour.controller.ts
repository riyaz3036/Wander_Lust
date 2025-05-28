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
import { CreateTourRequestDTO } from './dto/create-tour-request.dto';
import { TourFilterDTO } from './dto/tour-filter.dto';
import { UpdateTourRequestDTO } from './dto/update-tour-request.dto';
import { TourService } from './tour.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('Tour')
@ApiBearerAuth()
@Controller(RouteConstants.TOUR)
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a new tour' })
  @Post(RouteConstants.ADD_TOUR)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createTourDto: CreateTourRequestDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createTourDto.image = file.path;
    }
    const result = await this.tourService.createTour(createTourDto);
    return new SuccessObjectResponseDTO(result);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch all tours' })
  @Get(RouteConstants.GET_ALL_TOURS)
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


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch a tour by ID' })
  @Get(RouteConstants.GET_TOUR_BY_ID)
  async findOne(@Param('id') id: string) {
    const tour = await this.tourService.findTour(id);
    return new SuccessObjectResponseDTO(tour);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a tour by ID' })
  @Patch(RouteConstants.UPDATE_TOUR_BY_ID)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourRequestDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateTourDto.image = file.path;
    }
    const updated = await this.tourService.updateTour(id, updateTourDto);
    return new SuccessObjectResponseDTO(updated);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a tour by ID' })
  @Delete(RouteConstants.DELETE_TOUR_BY_ID)
  async remove(@Param('id') id: string) {
    const deleted = await this.tourService.removeTour(id);
    return new SuccessMessageResponseDTO(deleted);
  }
}
