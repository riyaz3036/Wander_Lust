import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from 'src/activity/activity.module';
import { BookingModule } from 'src/booking/booking.module';
import { DestinationModule } from 'src/destination/destination.module';
import { TourModule } from 'src/tour/tour.module';
import { UsersController } from './user.controller';
import { UsersRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UsersService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => BookingModule),
    MulterModule.register({
      dest: './uploads', 
    }),
    TourModule,
    DestinationModule,
    ActivityModule
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository], 
  exports: [UsersService, UsersRepository],   
})
export class UsersModule {}
