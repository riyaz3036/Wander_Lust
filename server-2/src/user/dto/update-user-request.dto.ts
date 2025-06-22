import { IsOptional, IsString, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { UserMembershipEnum } from '../enum/user-membership.enum';
import { Role } from 'src/common/enums/access-role.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDTO {
  @IsOptional() 
  @IsString() 
  @ApiProperty()
  username?: string;

  @IsOptional() 
  @ApiProperty()
  @IsEmail() 
  email?: string;

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  phone?: string;

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  password?: string;

  @IsOptional() 
  @ApiProperty()
  @IsString() 
  image?: string;

  @IsOptional() 
  @ApiProperty()
  @Type(() => Number)
  @IsNumber() 
  balance?: number;

  @IsOptional() 
  @ApiProperty()
  @IsEnum(UserMembershipEnum) 
  membership?: string;

  @IsOptional() 
  @ApiProperty()
  @IsEnum(Role) 
  role?: string;
}
