import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DestinationModule } from 'src/destination/destination.module';
import { TourModule } from 'src/tour/tour.module';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { Activity, ActivitySchema } from './activity.schema';
import { ActivityService } from './activity.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
     forwardRef(() => DestinationModule),
     TourModule
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository]
})
export class ActivityModule {}
