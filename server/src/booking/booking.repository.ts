import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from './booking.schema';
import { BookingFilterDTO } from './dto/booking-filter.dto';

type BookingDocument = Booking & Document;

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>,
  ) {}

  /* find booking by id */
  async findById(id: string): Promise<BookingDocument | null> {
    return this.bookingModel.findById(id)
      .populate('user_id')
      .populate('tour_id')
      .populate('signed_activities');
  }

  /* to find all bookings */
  async findAll(
    filters: BookingFilterDTO,
    page?: number, 
    size?: number
  ):Promise<{ data: Booking[]; total: number }> {
    const query: any = {};

    if (filters.user_id?.length) {
      query.user_id = {
      $in: filters.user_id.map(id => new Types.ObjectId(id)),
    };
    }

    let dataPromise: Promise<Booking[]>;
    let totalPromise: Promise<number>;

    if (page && size) {
      const skip = (page - 1) * size;
      dataPromise = this.bookingModel.find(query).skip(skip).limit(size).exec();
    } else {
      dataPromise = this.bookingModel.find(query).exec();
    }
    totalPromise = this.bookingModel.countDocuments(query).exec();

   const [data, total] = await Promise.all([dataPromise, totalPromise]);
    return {data, total};
  }


  /* count of all the bookings */
  async count(): Promise<number> {
    return this.bookingModel.countDocuments();
  }

  /* find and delete booking */
  async findByIdAndDelete(id: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }

  deleteManyByUserId(userId: string) {
    return this.bookingModel.deleteMany({ user_id: userId });
  }

  findOneByTourAndActivity(tourId: string, activityId: string) {
    return this.bookingModel.findOne({
      tour_id: tourId,
      signed_activities: activityId.toString(),
    });
  }

  findOneByTourId(tourId: string) {
    return this.bookingModel.findOne({ tour_id: tourId });
  }
}
