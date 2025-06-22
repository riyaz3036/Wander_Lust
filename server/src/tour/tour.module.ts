import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Tour, TourSchema } from "./tour.schema";
import { TourService } from "./tour.service";
import { TourController } from "./tour.controller";
import { TourRepository } from "./tour.repository";
import { DestinationModule } from "src/destination/destination.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', 
    }),
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    forwardRef(() => DestinationModule),
  ],
  controllers: [TourController],
  providers: [TourService, TourRepository],
  exports: [TourService, TourRepository]
})
export class TourModule {}
