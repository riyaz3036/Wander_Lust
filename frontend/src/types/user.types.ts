import { RolesEnum } from "../enums/roles.enum";
import { UserMembership } from "../enums/user-membership.enum";

export interface User {
  id: string,
  username: string,
  email: string,
  phone: string,
  password?: string,
  image: string,
  balance: number,
  membership: UserMembership,
  role: RolesEnum
}

export interface UpdateUser {
  username?: string,
  email?: string,
  phone?: string,
  password?: string,
  file?: any,
  balance?: number,
  membership?: string,
  role?: RolesEnum
}
