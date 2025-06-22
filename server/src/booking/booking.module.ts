import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from 'src/activity/activity.module';
import { TourModule } from 'src/tour/tour.module';
import { UsersModule } from 'src/user/user.module';
import { BookingController } from './booking.controller';
import { BookingsRepository } from './booking.repository';
import { Booking, BookingSchema } from './booking.schema';
import { BookingService } from './booking.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema }
    ]),
    forwardRef(() => UsersModule),
    ActivityModule,
    TourModule
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingsRepository ],
  exports: [BookingService, BookingsRepository]
})
export class BookingModule {}
