import { IsEmail, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/common/enums/access-role.enum';
import { UserMembershipEnum } from 'src/user/enum/user-membership.enum';


export class LoginResponseDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  image: string;

  @IsNumber()
  balance: number;

  @IsEnum(UserMembershipEnum)
  membership: UserMembershipEnum;

  @IsEnum(Role)
  role: Role;

  @IsMongoId()
  _id: string;

  @IsNumber()
  __v: number;

  @IsString()
  token: string; 

  constructor(data: LoginResponseDTO) {
    Object.assign(this, data);
  }
}
