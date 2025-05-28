import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { BookingModule } from './booking/booking.module';
import { DestinationModule } from './destination/destination.module';
import { TourModule } from './tour/tour.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppService } from './app.service';
import { GlobalExceptionFilter } from './common/handlers/global-exception.handler';
import { APP_FILTER } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15d' },
    }),
    // Directly import feature modules
    UsersModule,
    TourModule,
    AuthModule,
    ActivityModule,
    BookingModule,
    DestinationModule,
    AnalyticsModule,
  ],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [JwtModule]
})
export class AppModule {}
