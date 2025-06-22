import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/common/enums/access-role.enum';
import { UserMembershipEnum } from 'src/user/enum/user-membership.enum';


export class LoginResponseDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  balance: number;

  @ApiProperty()
  @IsEnum(UserMembershipEnum)
  membership: UserMembershipEnum;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @IsNumber()
  __v: number;

  @ApiProperty()
  @IsString()
  token: string; 

  constructor(data: LoginResponseDTO) {
    Object.assign(this, data);
  }
}
