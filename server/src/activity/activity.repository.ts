import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './activity.schema';
import { ActivityFilterDTO } from './dto/activity-filter.dto';


@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  /* create an activity */
  create(data: Partial<Activity>) {
    return new this.activityModel(data).save();
  }


  /* find all activities - paginated */
  async findAll(
    filters: ActivityFilterDTO,
    page?: number,
    size?: number,
  ): Promise<{ data: Activity[]; total: number }> {
    const query: any = {};

    if (filters.dest_id?.length) {
      query.dest_id = { $in: filters.dest_id };
    }

    if (filters.startPrice !== undefined) {
      query.price = { ...(query.price || {}), $gte: filters.startPrice };
    }

    if (filters.endPrice !== undefined) {
      query.price = { ...(query.price || {}), $lte: filters.endPrice };
    }

    let data: Activity[];
    let total: number;

    if (page && size) {
      const skip = (page - 1) * size;
      data = await this.activityModel.find(query).skip(skip).limit(size).exec();
    } else {
      data = await this.activityModel.find(query).exec();
    }

    total = await this.activityModel.countDocuments(query).exec();

    return { data, total };
  }



  /* find an activity by id */
  findById(id: string) {
    return this.activityModel.findById(id).exec();
  }

  /* update activity by id */
  update(id: string, data: Partial<Activity>) {
    return this.activityModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /* delete activity by id */
  delete(id: string) {
    return this.activityModel.findByIdAndDelete(id).exec();
  }

  /* find activities by destination id */
  findByDestinationId(dest_id: string) {
    return this.activityModel.find({ dest_id }).exec();
  }

  /* find the count of all activities */
  async count(): Promise<number> {
    return this.activityModel.countDocuments();
  }

  async deleteManyByDestinationId(dest_id: string) {
    return await this.activityModel.deleteMany({ dest_id }).exec();
  }
}
