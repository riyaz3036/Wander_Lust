import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { SuccessPaginatedResponseDTO } from 'src/common/dtos/success-paginated-response.dto';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { UsersService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedUserResponseDTO } from './dto/swagger/PaginatedUserResponse.dto';
import { UserSuccessResponse } from './dto/swagger/UserSuccessResponse.dto';


@ApiTags('User')
@ApiBearerAuth()
@Controller(RouteConstants.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Paginated user response',
    type: PaginatedUserResponseDTO,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @UseGuards(JwtAuthGuard)
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



  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({
    description: 'Fetched user response',
    type: UserSuccessResponse,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Get(RouteConstants.GET_USER_BY_ID)
  async getUser(
    @Param('id') id: string
  ) {
    
    const user = await this.usersService.getUserById(id);
    return new SuccessObjectResponseDTO(user);
  }


  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiOkResponse({
    description: 'Updated user response',
    type: UserSuccessResponse,
  })
  @ApiBody({type: UpdateUserRequestDTO})
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Patch(RouteConstants.UPDATE_USER_BY_ID)
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserRequestDTO,
     @UploadedFile() file?: Express.Multer.File,
  ) {
    const updated = await this.usersService.updateUser(id, updateUserDto, file);
    return new SuccessObjectResponseDTO(updated);
  }



  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiOkResponse({
    type: SuccessMessageResponseDTO,
  })
  @ApiParam({ name: 'id', required: true, type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(RouteConstants.DELETE_USER_BY_ID)
  async deleteUser(@Param('id') id: string) {
    const deleted = await this.usersService.deleteUser(id);
    return new SuccessMessageResponseDTO(deleted);
  }
}
