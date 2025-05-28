import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { UsersService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('User')
@ApiBearerAuth()
@Controller(RouteConstants.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get(RouteConstants.GET_ALL_USERS)
  async getAllUsers(
    @Query('page') page = '1',
    @Query('size') size = '10'
  ) {
    const pageNum = parseInt(page, 10);
    const sizeNum = parseInt(size, 10);
    const users = await this.usersService.getAllUsers(pageNum, sizeNum);
    return new SuccessPaginatedResponseDTO(users.data, pageNum, sizeNum, users.total);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a user by ID' })
  @Get(RouteConstants.GET_USER_BY_ID)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return new SuccessObjectResponseDTO(user);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a user by ID' })
  @Patch(RouteConstants.UPDATE_USER_BY_ID)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDTO) {
    const updated = await this.usersService.updateUser(id, updateUserDto);
    return new SuccessObjectResponseDTO(updated);
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @Delete(RouteConstants.DELETE_USER_BY_ID)
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.usersService.deleteUser(id);
    return new SuccessMessageResponseDTO(deleted);
  }
}
