import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination } from './destination.schema';
import { DestinationFilterDTO } from './dto/destination-filter.dto';


@Injectable()
export class DestinationRepository {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<Destination>,
  ) {}

  create(data: Partial<Destination>) {
    return this.destinationModel.create(data);
  }


  async findAll(
    filters: DestinationFilterDTO,
    page?: number,
    size?: number
  ): Promise<{ data: Destination[]; total: number }> {
    const query: any = {};

    if (filters.tour_id?.length) {
      query.tour_id = { $in: filters.tour_id };
    }

    let dataPromise: Promise<Destination[]>;
    let totalPromise: Promise<number>;

    if (page && size) {
      const skip = (page - 1) * size;
      dataPromise = this.destinationModel.find(query).skip(skip).limit(size).exec();
    } else {
      dataPromise = this.destinationModel.find(query).exec();
    }

    totalPromise = this.destinationModel.countDocuments(query).exec();

    const [data, total] = await Promise.all([dataPromise, totalPromise]);

    return { data, total };
  }


  findById(id: string) {
    return this.destinationModel.findById(id).exec();
  }

  updateById(id: string, data: Partial<Destination>) {
    return this.destinationModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  deleteById(id: string) {
    return this.destinationModel.findByIdAndDelete(id).exec();
  }

  async count(): Promise<number> {
    return this.destinationModel.countDocuments();
  }

  findByTourId(tourId: string) {
    return this.destinationModel.find({ tour_id: tourId });
  }

}
