import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RouteConstants } from 'src/common/constants/route.constants';
import { SuccessMessageResponseDTO } from 'src/common/dtos/success-message-response.dto';
import { SuccessObjectResponseDTO } from 'src/common/dtos/success-object-response.dto';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { RegisterRequestDTO } from './dto/register-request.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller(RouteConstants.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({ summary: 'Registers a new user and returns the result' })
  @Post(RouteConstants.REGISTER)
  async register(@Body() dto: RegisterRequestDTO, @Res() res: Response) {
      const result = await this.authService.Register(dto);
      const response = new SuccessMessageResponseDTO(result);
      return res.status(HttpStatus.OK).json(response);
  }


  @ApiOperation({ summary: 'Logs in the user and sets a secure token in cookies' })
  @HttpCode(HttpStatus.OK)
  @Post(RouteConstants.LOGIN)
  async login(@Body() dto: LoginRequestDTO, @Res() res: Response) {
    const result = await this.authService.Login(dto);

    res.cookie('accessToken', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    const response = new SuccessObjectResponseDTO(result); 
    return res.status(HttpStatus.OK).json(response);
  }
}
