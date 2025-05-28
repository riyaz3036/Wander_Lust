import { Injectable, NotFoundException } from '@nestjs/common';
import { DestinationRepository } from './destination.repository';
import { Types } from 'mongoose';
import { Destination } from './destination.schema';
import { CreateDestinationDTO } from './dto/create-destination.dto';
import { DestinationResponseDTO } from './dto/destination-response.dto';
import { UpdateDestinationDTO } from './dto/update-destination.dto';
import { TourRepository } from 'src/tour/tour.repository';
import { ActivityRepository } from 'src/activity/activity.repository';
import { ActivityService } from 'src/activity/activity.service';
import { DestinationFilterDTO } from './dto/destination-filter.dto';


@Injectable()
export class DestinationService {
  constructor(
    private readonly destinationRepo: DestinationRepository,
    private readonly tourRepository: TourRepository,
    private readonly activityRepository: ActivityRepository,
    private readonly activityService: ActivityService,
  ) {}

  /* Service function to create a destination */
  async createDestination(dto: CreateDestinationDTO): Promise<DestinationResponseDTO> {
    const tour = await this.tourRepository.findById(dto.tour_id);
    if (!tour) throw new NotFoundException('Tour not found');

    const createData: Partial<Destination> = {
        title: dto.title,
        description: dto.description,
        tour_id: new Types.ObjectId(dto.tour_id),
        image: dto.image ?? undefined, 
    };

    const createdDestination = await this.destinationRepo.create(createData);

    return new DestinationResponseDTO({
        id:  createdDestination._id,
        title:  createdDestination.title,
        tour_id:  createdDestination.tour_id.toString(),
        description:  createdDestination.description,
        image:  createdDestination.image,
        activities: []
    })
    }

 
  /* service function to find all the destinations */
  async findAllDestinations(
    filters: DestinationFilterDTO
  ): Promise<{ data: DestinationResponseDTO[]; total: number }> {
    const destinations = await this.destinationRepo.findAll(filters);

    const destinationsResponse = await Promise.all(
      destinations.data.map(async (destination) => {
        const activities_of_the_destination = await this.activityService.findAllActivities({dest_id: [destination._id]})
        return new DestinationResponseDTO({
          id:  destination._id,
          title:  destination.title,
          tour_id:  destination.tour_id.toString(),
          description:  destination.description,
          image:  destination.image,
          activities: activities_of_the_destination.data
      });
      })
    );
    return {data: destinationsResponse, total: destinations.total};
  }


  async findAllPaginatedDestinations(
    filters: DestinationFilterDTO,
    page: number,
    size: number
  ): Promise<{ data: DestinationResponseDTO[]; total: number }> {

    const destinations = await this.destinationRepo.findAll(filters, page, size);

    const destinationsResponse = await Promise.all(
      destinations.data.map(async (destination) => {
        const activities_of_the_destination = await this.activityService.findAllActivities({
          dest_id: [destination._id]
        });

        return new DestinationResponseDTO({
          id: destination._id,
          title: destination.title,
          tour_id: destination.tour_id.toString(),
          description: destination.description,
          image: destination.image,
          activities: activities_of_the_destination.data
        });
      })
    );

    return {
      data: destinationsResponse,
      total: destinations.total
    };
  }



  /* Service function to find a destination */
  async findDestination(id: string): Promise<DestinationResponseDTO> {
    const destination = await this.destinationRepo.findById(id);
    if (!destination) throw new NotFoundException('Destination not found');

    const activities_of_the_destination = await this.activityService.findAllActivities({dest_id: [destination._id]})
    
    return new DestinationResponseDTO({
        id:  destination._id,
        title:  destination.title,
        tour_id:  destination.tour_id.toString(),
        description:  destination.description,
        image:  destination.image,
        activities: activities_of_the_destination.data
    });
  }


  /* Service function to update a destination */
  async updateDestination(id: string, dto: UpdateDestinationDTO) {
    const { tour_id, image, ...rest } = dto;

    const updateData: Partial<Destination> = {
        ...rest,
        ...(tour_id ? { tour_id: new Types.ObjectId(tour_id) } : {}),
        ...(image === null ? {} : { image }),
    };

    const updated = await this.destinationRepo.updateById(id, updateData);
    if (!updated) throw new NotFoundException('Destination not found');
    const activities_of_the_destination = await this.activityService.findAllActivities({dest_id: [updated._id]})

    return new DestinationResponseDTO({
        id:  updated._id,
        title:  updated.title,
        tour_id:  updated.tour_id.toString(),
        description:  updated.description,
        image:  updated.image,
        activities: activities_of_the_destination.data
    });
  }


  /* Service function to Remove a destination */
  async removeDestination(id: string) {
    const destination = await this.destinationRepo.findById(id);
    if (!destination) throw new NotFoundException('Destination not found');

    const activities = await this.activityRepository.findByDestinationId(id);

    await this.activityRepository.deleteManyByDestinationId(id);
    await this.destinationRepo.deleteById(id);

    return `Destination with id: ${id} deleted successfully`;
  }
}
