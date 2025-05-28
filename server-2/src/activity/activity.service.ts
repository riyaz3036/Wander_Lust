import { Injectable, NotFoundException, Logger, BadRequestException, ConflictException } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { Types } from 'mongoose';
import { Activity } from './activity.schema';
import { DestinationRepository } from 'src/destination/destination.repository';
import { TourRepository } from 'src/tour/tour.repository';
import { CreateActivityRequestDTO } from './dto/create-activity-request.dto';
import { UpdateActivityRequestDTO } from './dto/update-activity-request.dto';
import { ActivityResponseDTO } from './dto/activity-response.dto';
import { ActivityFilterDTO } from './dto/activity-filter.dto';


@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(
    private readonly activityRepo: ActivityRepository,
    private readonly destinationRepository: DestinationRepository,
    private readonly tourRepository: TourRepository,
  ) {}


  /* Service function to create a new activity */
  async createActivity(dto: CreateActivityRequestDTO): Promise<ActivityResponseDTO> {
    if (!Types.ObjectId.isValid(dto.dest_id)) throw new BadRequestException('Invalid destination ID format');
    const createData = {
      ...dto,
      dest_id: new Types.ObjectId(dto.dest_id),
    };

    try {
      const activity =  await this.activityRepo.create(createData);
      return new ActivityResponseDTO({
        id: activity._id,
        title: activity.title,
        dest_id: activity.dest_id.toString(),
        price: activity.price,
        description: activity.description,
      });
    } catch (error) {
      this.logger.error(`Failed to create activity: ${error.message}`, error.stack);
      if (error.code === 11000) throw new ConflictException('Activity already exists');
      if (error.name === 'ValidationError') throw new BadRequestException(`Validation failed: ${error.message}`);
      throw error;
    }
  }


  /* Finding all activities with pagination */
  async findAllPaginatedActivities(
    page: number,
    size: number,
    filters: ActivityFilterDTO
  ): Promise<{ data: ActivityResponseDTO[]; total: number }> {
    const activities = await this.activityRepo.findAll(filters, page, size);

    const responseData = activities.data.map((activity) => {
      return new ActivityResponseDTO({
        id: activity._id,
        title: activity.title,
        dest_id: activity.dest_id.toString(),
        price: activity.price,
        description: activity.description,
      });
    });

    return {
      data: responseData,
      total: activities.total,
    };
  }



  /* Finding all activities with pagination */
  async findAllActivities(
    filters: ActivityFilterDTO
  ): Promise<{ data: ActivityResponseDTO[]; total: number }> {
    const activities = await this.activityRepo.findAll(filters);

    const responseData = activities.data.map((activity) => {
      return new ActivityResponseDTO({
        id: activity._id,
        title: activity.title,
        dest_id: activity.dest_id.toString(),
        price: activity.price,
        description: activity.description,
      });
    });

    return {
      data: responseData,
      total: activities.total,
    };
  }



  /* Service function to find an activity by its id */
  async findActivity(id: string): Promise<ActivityResponseDTO> {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid activity ID format');

    const activity = await this.activityRepo.findById(id);
    if (!activity) throw new NotFoundException('Activity not found');

    return new ActivityResponseDTO({
      id: activity._id,
      title: activity.title,
      dest_id: activity.dest_id.toString(),
      price: activity.price,
      description: activity.description,
    });
  }


  /* Service function to find and update an activity by its id */
  async updateActivity(id: string, dto: UpdateActivityRequestDTO): Promise<ActivityResponseDTO> {
      const updateData: any = { ...dto };

      if (dto.dest_id) updateData.dest_id = new Types.ObjectId(dto.dest_id);

      const updated = await this.activityRepo.update(id, updateData);
      if (!updated) throw new NotFoundException('Activity not found');

      return new ActivityResponseDTO({
        id: updated._id,
        title: updated.title,
        dest_id: updated.dest_id.toString(),
        price: updated.price,
        description: updated.description,
      });
  }


  /* Service function to find an activity by its id */
  async removeActivity(id: string): Promise<string> {
    const activity = await this.activityRepo.findById(id);
    if (!activity) throw new NotFoundException('Activity not found');

    await this.activityRepo.delete(id);
    return `Activity with id ${id} deleted successfully.`;
  }
}
