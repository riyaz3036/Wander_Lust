import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ActivityRepository } from 'src/activity/activity.repository';
import { BookingsRepository } from 'src/booking/booking.repository';
import { DestinationRepository } from 'src/destination/destination.repository';
import { TourRepository } from 'src/tour/tour.repository';
import { UsersRepository } from 'src/user/user.repository';
import { CountResponseDTO } from './dto/count-response.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly tourRepository: TourRepository,
    private readonly activityRepository: ActivityRepository,
    private readonly destinationRepository: DestinationRepository,
    private readonly bookingRepository: BookingsRepository,
  ) {}

  async getCount(): Promise<CountResponseDTO> {
    try {
      const [users, tours, activities, destinations, bookings] = await Promise.all([
        this.userRepository.count(),
        this.tourRepository.count(),
        this.activityRepository.count(),
        this.destinationRepository.count(),
        this.bookingRepository.count(),
      ]);

      return { users, tours, activities, destinations, bookings };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch analytics counts');
    }
  }
}

