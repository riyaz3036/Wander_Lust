import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from 'src/activity/activity.module';
import { BookingModule } from 'src/booking/booking.module';
import { DestinationModule } from 'src/destination/destination.module';
import { TourModule } from 'src/tour/tour.module';
import { UsersModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    UsersModule,
    TourModule,
    ActivityModule,
    DestinationModule,
    BookingModule
  ],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService
  ],
  exports: [AnalyticsService]
})
export class AnalyticsModule {}

