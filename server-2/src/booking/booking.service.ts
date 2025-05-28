import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { TourRepository } from 'src/tour/tour.repository';
import { TourService } from 'src/tour/tour.service';
import { UsersRepository } from 'src/user/user.repository';
import { UsersService } from 'src/user/user.service';
import { BookingsRepository } from './booking.repository';
import { Booking } from './booking.schema';
import { BookingResponseDTO } from './dto/booking-response.dto';
import { CreateBookingRequestDTO } from './dto/create-booking-request.dto';
import { BookingFilterDTO } from './dto/booking-filter.dto';

type BookingDocument = Booking & Document;

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>,
    private readonly tourRepository: TourRepository,
    private readonly tourService: TourService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly bookingRepository: BookingsRepository,
  ) {}

  /* Service function to create a booking */
  async createBooking(dto: CreateBookingRequestDTO): Promise<BookingResponseDTO> {
    try {
      const userId = new Types.ObjectId(dto.user_id);
      const tourId = new Types.ObjectId(dto.tour_id);
      const signedActivities = dto.signed_activities.map(id => new Types.ObjectId(id));

      const newBooking = new this.bookingModel({
        user_id: userId,
        tour_id: tourId,
        signed_activities: signedActivities,
        price: dto.price,
        bookFor: dto.bookFor,
        guestSize: dto.guestSize,
      });

      await newBooking.save();

      // Use repositories instead of direct model access
      await this.tourRepository.update(tourId.toString(), {vacancy: dto.guestSize});

      await this.usersRepository.decreaseBalance(userId.toString(), dto.price);

      const tour = await this.tourService.findTour(dto.tour_id.toString());
      const user = await this.usersService.getUserById(dto.user_id.toString());

      return new BookingResponseDTO({
        id: newBooking._id.toString(),
        user: user,
        tour: tour,
        signed_activities: newBooking.signed_activities.map(activity => activity.toString()),
        price: newBooking?.price,
        bookFor: newBooking?.bookFor,
        guestSize: newBooking?.guestSize
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create booking');
    }
  }


  /* Servicce function to find a booking by its id */
  async findBooking(id: string): Promise<BookingResponseDTO> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const tour = await this.tourService.findTour(booking.tour_id._id.toString());
    const user = await this.usersService.getUserById(booking.user_id._id.toString());

    return new BookingResponseDTO({
        id: booking._id.toString(),
        user: user,
        tour: tour,
        signed_activities: booking.signed_activities.map(activity => activity.toString()),
        price: booking?.price,
        bookFor: booking?.bookFor,
        guestSize: booking?.guestSize
    });
  }


  /* FInding the bookings for a givrn user */
  async findAllBookingsForUser(userId: string, page: number, size: number): Promise<{data: BookingResponseDTO[], total: number}> {
    const bookings = await this.bookingRepository.findAll({user_id: [userId]}, page, size);

    const bookingResponse = await Promise.all(
      bookings.data.map(async (booking) => {
        const tour = await this.tourService.findTour(booking.tour_id.toString());
        const user = await this.usersService.getUserById(booking.user_id._id.toString());
        return new BookingResponseDTO({
          id: booking._id.toString(),
          user: user,
          tour: tour,
          signed_activities: booking.signed_activities.map(activity => activity.toString()),
          price: booking?.price,
          bookFor: booking?.bookFor,
          guestSize: booking?.guestSize
        });
      })
    );

    return {data: bookingResponse, total: bookings.total};
  }


  /* service function to find all bookings */
  async findAllBookings(page: number, size: number, filters: BookingFilterDTO): Promise<{data: BookingResponseDTO[], total: number}> {
    const bookings = await this.bookingRepository.findAll(filters);

    const bookingResponse = await Promise.all(
      bookings.data.map(async (booking) => {
        const tour = await this.tourService.findTour(booking.tour_id._id.toString());
        const user = await this.usersService.getUserById(booking.user_id._id.toString());
        return new BookingResponseDTO({
          id: booking._id.toString(),
          user: user,
          tour: tour,
          signed_activities: booking.signed_activities.map(activity => activity.toString()),
          price: booking?.price,
          bookFor: booking?.bookFor,
          guestSize: booking?.guestSize
        });
      })
    );

    return {data: bookingResponse, total: bookings.total};
  }


  /* Service function to delete a booking */
  async deleteBooking(id: string): Promise<string> {
    try {
      const booking = await this.bookingRepository.findById(id);
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      // Use repositories for undoing updates
      await this.tourRepository.update(booking.tour_id.toString(), {vacancy: booking.guestSize});

      await this.usersRepository.increaseBalance(booking.user_id.toString(), booking.price);
      await this.bookingRepository.findByIdAndDelete(id);

      return `Booking with id: ${id} deleted successfully`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete booking');
    }
  }
}
