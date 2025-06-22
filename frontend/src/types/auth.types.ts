import { RolesEnum } from "../enums/roles.enum";
import { UserMembership } from "../enums/user-membership.enum";

export interface LoginResponse {
  username: string;
  email: string;
  phone: string;
  image: string;
  balance: number;
  membership: UserMembership;
  role: RolesEnum;
  _id: string;
  __v: number;
  token: string; 
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  role: RolesEnum;
  ADMIN_KEY?: string;
}