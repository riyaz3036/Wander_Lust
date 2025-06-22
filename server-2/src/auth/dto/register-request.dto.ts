import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/access-role.enum';

export class RegisterRequestDTO {
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone?: string;

  @IsString()
  @IsEnum(Role)
  @ApiProperty()
  role: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  ADMIN_KEY?: string;
}


