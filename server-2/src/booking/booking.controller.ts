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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { BookingService } from './booking.service';
import { BookingFilterDTO } from './dto/booking-filter.dto';
import { CreateBookingRequestDTO } from './dto/create-booking-request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('Booking')
@ApiBearerAuth()
@Controller(RouteConstants.BOOKING)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new booking' })
  @Post(RouteConstants.ADD_BOOKING)
  async create(@Body() dto: CreateBookingRequestDTO) {
    try {
      const created = await this.bookingService.createBooking(dto);
      return new SuccessObjectResponseDTO(created);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch a booking by ID' })
  @Get(RouteConstants.GET_BOOKING_BY_ID)
  async findOne(@Param('id') id: string) {
    const booking = await this.bookingService.findBooking(id);
    return new SuccessObjectResponseDTO(booking);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch all bookings for a specific user' })
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


  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Fetch all bookings' })
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


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @Delete(RouteConstants.DELETE_BOOKING_BY_ID)
  async delete(@Param('id') id: string) {
    const deleted = await this.bookingService.deleteBooking(id);
    return new SuccessObjectResponseDTO(deleted);
  }
}
