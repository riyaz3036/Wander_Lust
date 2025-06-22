import { SetMetadata } from '@nestjs/common';
import { AccessRole } from '../enums/access-role.enum';

export const ROLES_KEY = 'roles'; 
export const Roles = (...roles: AccessRole[]) => SetMetadata(ROLES_KEY, roles);
