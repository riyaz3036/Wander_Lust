import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { BookingService } from './booking.service';
import { BookingFilterDTO } from './dto/booking-filter.dto';
import { CreateBookingRequestDTO } from './dto/create-booking-request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { BookingResponseDTO } from './dto/booking-response.dto';
import { PaginatedBookingsResponseDTO } from './dto/swagger/PaginatedBookingResponse.dto';
import { UserResponseDTO } from 'src/user/dto/user-response.dto';
import { TourResponseDTO } from 'src/tour/dto/tour-response.dto';
import { ActivityResponseDTO } from 'src/activity/dto/activity-response.dto';
import { BookingSuccessResponse } from './dto/swagger/BookingSuccessResponse.dto';


@ApiTags('Booking')
@ApiBearerAuth()
@Controller(RouteConstants.BOOKING)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Create a new booking' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({type: CreateBookingRequestDTO})
  @ApiOkResponse({
    description: 'Created Booking response',
    type: BookingSuccessResponse,
  })
  @Post(RouteConstants.ADD_BOOKING)
  async create(@Body() dto: CreateBookingRequestDTO) {
    try {
      const created = await this.bookingService.createBooking(dto);
      return new SuccessObjectResponseDTO(created);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }



  @ApiOperation({ summary: 'Fetch a booking by ID' })
  @ApiOkResponse({
    description: 'Fetched booking response',
    type: BookingSuccessResponse,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Get(RouteConstants.GET_BOOKING_BY_ID)
  async findOne(@Param('id') id: string) {
    const booking = await this.bookingService.findBooking(id);
    return new SuccessObjectResponseDTO(booking);
  }


  @ApiOperation({ summary: 'Fetch all bookings for a specific user' })
  @ApiExtraModels(BookingResponseDTO, UserResponseDTO, TourResponseDTO, ActivityResponseDTO)
  @ApiOkResponse({
    description: 'Paginated bookings of a user response',
    type: PaginatedBookingsResponseDTO,
  })
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @Get(RouteConstants.GET_BOOKINGS_FOR_USER)
  async findAllByUser(
    @Param('id') userId: string,
    @Query('page') page = '1',
    @Query('size') size = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);

    const bookings = await this.bookingService.findAllBookingsForUser(userId, pageNum, sizeNum);
    return new SuccessPaginatedResponseDTO(bookings.data, pageNum, sizeNum, bookings.total);
  }


  @ApiOperation({ summary: 'Fetch all bookings' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Paginated booking response',
    type: PaginatedBookingsResponseDTO,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'filters', required: false, type: BookingFilterDTO})
  @Get(RouteConstants.GET_ALL_BOOKINGS)
  async findAll(
    @Query() filters: BookingFilterDTO,
    @Query('page') page = '1',
    @Query('size') size = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);
    const bookings = await this.bookingService.findAllBookings(pageNum, sizeNum, filters);
    return new SuccessPaginatedResponseDTO(bookings.data, pageNum, sizeNum, bookings.total);
  }


  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiOkResponse({
    description: 'Deleted booking response',
    type: BookingSuccessResponse,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(RouteConstants.DELETE_BOOKING_BY_ID)
  async delete(@Param('id') id: string) {
    const deleted = await this.bookingService.deleteBooking(id);
    return new SuccessObjectResponseDTO(deleted);
  }
}
