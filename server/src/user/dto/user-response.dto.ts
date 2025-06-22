import { IsOptional, IsString, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { UserMembershipEnum } from '../enum/user-membership.enum';
import { Role } from 'src/common/enums/access-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @IsString() 
  @ApiProperty()
  id: string

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  username: string;

  @IsOptional()
  @ApiProperty()
  @IsEmail() 
  email: string;

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  phone: string;

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  password: string;

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  image: string;

  @IsOptional() 
  @ApiProperty()
  @IsNumber() 
  balance: number;

  @IsOptional() 
  @ApiProperty()
  @IsEnum(UserMembershipEnum)
  membership: string;

  @IsOptional() 
  @ApiProperty()
  @IsEnum(Role) 
  role: string;

  constructor(data: UserResponseDTO) {
    Object.assign(this, data);
  }
}
