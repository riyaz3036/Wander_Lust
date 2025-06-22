import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { RouteConstants } from 'src/common/constants/route.constants';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { CountResponseDTO } from './dto/count-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CountSuccessResponse } from './dto/swagger/CountSuccessResponse.dto';


@ApiTags('Analytics')
@ApiBearerAuth()
@Controller(RouteConstants.ANALYTICS)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Get counts of users, tours, activities, destinations, and bookings' })
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get Count Response',
    type: CountSuccessResponse,
  })
  @Get(RouteConstants.GET_COUNT)
  async getCounts(): Promise<SuccessObjectResponseDTO<CountResponseDTO>> {
    const result = await this.analyticsService.getCount();
    return new SuccessObjectResponseDTO(result);
  }
}
