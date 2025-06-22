import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour } from './tour.schema';
import { TourFilterDTO } from './dto/tour-filter.dto';


@Injectable()
export class TourRepository {
  constructor(@InjectModel(Tour.name) private tourModel: Model<Tour>) {}

  /* to create a tour */
  async create(tour: Partial<Tour>): Promise<Tour> {
    return this.tourModel.create(tour);
  }

  /* to find all tours */
  async findAll(
    filters: TourFilterDTO,
    page?: number,
    size?: number
  ): Promise<{ data: Tour[]; total: number }> {
    const query: any = {};

    if (filters.vacancy !== undefined) {
      query.vacancy = filters.vacancy;
    }

    if (filters.ids && filters.ids.length > 0) {
      query._id = { $in: filters.ids };
    }

    let dataPromise: Promise<Tour[]>;
    let totalPromise: Promise<number>;

    if (page && size) {
      const skip = (page - 1) * size;
      dataPromise = this.tourModel.find(query).skip(skip).limit(size).exec();
    } else {
      dataPromise = this.tourModel.find(query).exec();
    }

    totalPromise = this.tourModel.countDocuments(query).exec();

    const [data, total] = await Promise.all([dataPromise, totalPromise]);

    return { data, total };
  }


  /* to find a tour */
  async findById(id: string): Promise<Tour | null> {
    return this.tourModel.findById(id);
  }

  /* to update a tour */
  async update(id: string, tour: Partial<Tour>): Promise<Tour | null> {
    return this.tourModel.findByIdAndUpdate(id, tour, { new: true });
  }

  /* to delete a tour */
  async delete(id: string): Promise<Tour | null> {
    return this.tourModel.findByIdAndDelete(id);
  }

  /* to count all tours */
  async count(): Promise<number> {
    return this.tourModel.countDocuments();
  }
}