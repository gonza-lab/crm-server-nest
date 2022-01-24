import { Role } from 'src/role/entities/role.entity';

export interface Payload {
  email: string;
  role: Role;
}
