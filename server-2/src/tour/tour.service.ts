// tour.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DestinationService } from 'src/destination/destination.service';
import { CreateTourRequestDTO } from './dto/create-tour-request.dto';
import { TourFilterDTO } from './dto/tour-filter.dto';
import { TourResponseDTO } from './dto/tour-response.dto';
import { UpdateTourRequestDTO } from './dto/update-tour-request.dto';
import { TourRepository } from './tour.repository';
import { Tour } from './tour.schema';



@Injectable()
export class TourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly destinationService: DestinationService
  ) {}


  /* Service function to create a tour */
  async createTour(createTourDto: CreateTourRequestDTO): Promise<TourResponseDTO> {
    const tour = await this.tourRepository.create({
      ...createTourDto,
      start_date: new Date(createTourDto.start_date),
    });

    return new TourResponseDTO({
        id: tour._id,
        title: tour.title,
        location: tour.location,
        image: tour.image,
        description: tour.description,
        duration: tour.duration,
        price: tour.price,
        capacity: tour.capacity,
        vacancy: tour.vacancy,
        start_date: tour.start_date,
        destinations: []
    });
  }


  async findAllPaginatedTours(
    filters: TourFilterDTO,
    page: number,
    size: number
  ): Promise<{ data: TourResponseDTO[]; total: number }> {

    const tours = await this.tourRepository.findAll(filters, page, size);

    const tourResponse = await Promise.all(
      tours.data.map(async (tour) => {
        const destinations_of_the_tour = await this.destinationService.findAllDestinations({
          tour_id: [tour._id]
        });

        return new TourResponseDTO({
          id: tour._id,
          title: tour.title,
          location: tour.location,
          image: tour.image,
          description: tour.description,
          duration: tour.duration,
          price: tour.price,
          capacity: tour.capacity,
          vacancy: tour.vacancy,
          start_date: tour.start_date,
          destinations: destinations_of_the_tour.data
        });
      })
    );

    return {data: tourResponse, total: tours.total};
  }


  /* Service function to fetch all tours */
  async findAllTours(
    filters: TourFilterDTO
  ): Promise<{ data: TourResponseDTO[]; total: number }> {

    const tours = await this.tourRepository.findAll(filters);

    const tourResponse = await Promise.all(
      tours.data.map(async (tour) => {
        const destinations_of_the_tour = await this.destinationService.findAllDestinations({
          tour_id: [tour._id]
        });

        return new TourResponseDTO({
          id: tour._id,
          title: tour.title,
          location: tour.location,
          image: tour.image,
          description: tour.description,
          duration: tour.duration,
          price: tour.price,
          capacity: tour.capacity,
          vacancy: tour.vacancy,
          start_date: tour.start_date,
          destinations: destinations_of_the_tour.data
        });
      })
    );

    return {data: tourResponse, total: tours.total};
  }


  /* Service function to find a tour by id */
  async findTour(id: string): Promise<TourResponseDTO> {
    const tour = await this.tourRepository.findById(id);
    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    // Fetch all the related destinations
    const destinations = await this.destinationService.findAllDestinations({tour_id: [tour._id]})

    return new TourResponseDTO({
        id: tour._id,
        title: tour.title,
        location: tour.location,
        image: tour.image,
        description: tour.description,
        duration: tour.duration,
        price: tour.price,
        capacity: tour.capacity,
        vacancy: tour.vacancy,
        start_date: tour.start_date,
        destinations: destinations.data
    });
  }


  /* Service function to update a tour */
  async updateTour(id: string, updateTourDto: UpdateTourRequestDTO): Promise<TourResponseDTO> {
    const { start_date, ...rest } = updateTourDto;

    const updatePayload: Partial<Tour> = {
        ...rest,
        ...(start_date !== undefined ? { start_date: new Date(start_date) } : {}),
         ...(updateTourDto.image ? { image: updateTourDto.image } : {}),
    };

    const updatedTour = await this.tourRepository.update(id, updatePayload);
    if (!updatedTour) {
        throw new NotFoundException('Tour not found');
    }
    const destinations = await this.destinationService.findAllDestinations({tour_id: [updatedTour._id]})

    return new TourResponseDTO({
        id: updatedTour._id,
        title: updatedTour.title,
        location: updatedTour.location,
        image: updatedTour.image,
        description: updatedTour.description,
        duration: updatedTour.duration,
        price: updatedTour.price,
        capacity: updatedTour.capacity,
        vacancy: updatedTour.vacancy,
        start_date: updatedTour.start_date,
        destinations: destinations.data
    });
  }


  /* Service function to update a tour */
  async removeTour(id: string): Promise<string> {
    const deletedTour = await this.tourRepository.delete(id);
    if (!deletedTour) {
      throw new NotFoundException('Tour not found');
    }
    return `Successfully deleted tour with id: ${id}`;
  }
}