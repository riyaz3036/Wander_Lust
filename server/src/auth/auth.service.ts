import { Injectable, BadRequestException, UnauthorizedException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { User } from 'src/user/user.schema';
import { Role } from 'src/common/enums/access-role.enum';
import { LoginRequestDTO } from './dto/login-request.dto';
import { UsersRepository } from 'src/user/user.repository';
import { isNull, isUndefined } from 'lodash';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserMembershipEnum } from 'src/user/enum/user-membership.enum';


@Injectable()
export class AuthService {
  constructor(
     private readonly userRepository: UsersRepository,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  /* Service Function to Register the user */
  async Register(dto: RegisterRequestDTO): Promise<string> {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    if (dto.role === Role.ADMIN) {
      const ADMIN_KEY = process.env.ADMIN_KEY;
      if (dto.ADMIN_KEY !== ADMIN_KEY) {
        throw new ForbiddenException('Invalid admin key');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const newUser = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone? dto.phone: null,
      role: dto.role,
    });

    await newUser.save();
    return 'Successfully Registered';
  }

  

  /* Service Function to Register the user */
  async Login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
      const user = await this.userRepository.findByEmail(dto.email);
      if (isNull(user)) {
        throw new BadRequestException('User not found');
      }

      const passwordValid = await bcrypt.compare(dto.password, user.password);
      if (!passwordValid) {
        throw new UnauthorizedException('Incorrect email or password');
      }

      const payload = { id: user._id.toString(), role: user.role };
      const secretKey = process.env.JWT_SECRET_KEY;
      let token;
      if(!isUndefined(secretKey)) token = jwt.sign(payload, secretKey, { expiresIn: '15d' });
      else throw new Error('JWT secret key is not defined in environment variables');

      const { password, ...userData } = user.toObject();

      return new LoginResponseDTO({
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        image: userData.image,
        balance: userData.balance,
        membership: userData.membership,
        role: userData.role,
        _id: userData._id.toString(),
        __v: userData.__v,
        token,  
      });
  }
}
