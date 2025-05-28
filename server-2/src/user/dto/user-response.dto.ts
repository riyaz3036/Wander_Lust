import { IsOptional, IsString, IsEmail, IsEnum, IsNumber } from 'class-validator';
import { UserMembershipEnum } from '../enum/user-membership.enum';
import { Role } from 'src/common/enums/access-role.enum';

export class UserResponseDTO {
  @IsString() 
  id: string

  @IsOptional() 
  @IsString() 
  username: string;

  @IsOptional()
  @IsEmail() 
  email: string;

  @IsOptional() 
  @IsString() 
  phone: string;

  @IsOptional() 
  @IsString() 
  password: string;

  @IsOptional() 
  @IsString() 
  image: string;

  @IsOptional() 
  @IsNumber() 
  balance: number;

  @IsOptional() 
  @IsEnum(UserMembershipEnum)
  membership: string;

  @IsOptional() 
  @IsEnum(Role) 
  role: string;

  constructor(data: UserResponseDTO) {
    Object.assign(this, data);
  }
}
