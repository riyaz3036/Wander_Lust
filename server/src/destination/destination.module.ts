import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from 'src/activity/activity.module';
import { TourModule } from 'src/tour/tour.module';
import { DestinationController } from './destination.controller';
import { DestinationRepository } from './destination.repository';
import { Destination, DestinationSchema } from './destination.schema';
import { DestinationService } from './destination.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', 
    }),
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
    ]),
    forwardRef(() => TourModule),
    forwardRef(() => ActivityModule),
  ],
  controllers: [DestinationController],
  providers: [DestinationService, DestinationRepository],
  exports: [DestinationService, DestinationRepository]
})
export class DestinationModule {}
