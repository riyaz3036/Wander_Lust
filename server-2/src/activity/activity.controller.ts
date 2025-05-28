import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseFilters,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { RouteConstants } from 'src/common/constants/route.constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { GlobalExceptionFilter } from 'src/common/handlers/global-exception.handler';
import { CreateActivityRequestDTO } from './dto/create-activity-request.dto';
import { UpdateActivityRequestDTO } from './dto/update-activity-request.dto';
import { ActivityFilterDTO } from './dto/activity-filter.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Activity') 
@UseFilters(GlobalExceptionFilter)
@ApiBearerAuth()
@Controller(RouteConstants.ACTIVITY)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Adds a new Activity' })
  @Post(RouteConstants.ADD_ACTIVITY)
  async create(
    @Body() dto: CreateActivityRequestDTO
  ) {
    const created = await this.activityService.createActivity(dto);
    return new SuccessObjectResponseDTO(created);
  }


  @UseGuards(JwtAuthGuard)
  @Get(RouteConstants.GET_ALL_ACTIVITIES)
  @ApiOperation({ summary: 'Fetches all the activities with pagination' })
  async findAll(
    @Query('page') page = '1',
    @Query('size') size = '10',
    @Query(new ValidationPipe({ transform: true })) filters: ActivityFilterDTO,
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);

    const { data, total } = await this.activityService.findAllPaginatedActivities(
      pageNum,
      sizeNum,
      filters
    );

    return new SuccessPaginatedResponseDTO(data, pageNum, sizeNum, total);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Gets a specific activity by its id if it exists' })
  @Get(RouteConstants.GET_ACTIVITY_BY_ID)
  async findOne(@Param('id') id: string) {
    const activity = await this.activityService.findActivity(id);
    return new SuccessObjectResponseDTO(activity);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Updates specific fields of an activity by its id' })
  @Patch(RouteConstants.UPDATE_ACTIVITY_BY_ID)
  async update(@Param('id') id: string, @Body() dto: UpdateActivityRequestDTO) {
    const updated = await this.activityService.updateActivity(id, dto);
    return new SuccessObjectResponseDTO(updated);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetches and deletes an activity by its id' })
  @Delete(RouteConstants.DELETE_ACTIVITY_BY_ID)
  async remove(@Param('id') id: string) {
    const message = await this.activityService.removeActivity(id);
    return new SuccessMessageResponseDTO(message);
  }
}
