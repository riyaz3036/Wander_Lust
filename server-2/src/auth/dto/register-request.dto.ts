import { IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/access-role.enum';

export class RegisterRequestDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsEnum(Role)
  role: string;

  @IsOptional()
  @IsString()
  ADMIN_KEY?: string;
}


