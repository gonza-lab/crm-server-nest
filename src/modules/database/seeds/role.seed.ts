import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { CreateRoleDto } from '../../role/dto/create-role.dto';
import { Role } from '../../role/entities/role.entity';
import { Repository } from 'typeorm';

const roles: CreateRoleDto[] = [
  {
    name: 'Administrador',
  },
  {
    name: 'Cliente',
  },
];

@Injectable()
export class RoleSeed {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  @Command({ command: 'create:role', describe: 'Creates a role by seed' })
  async create() {
    await this.roleRepository.insert(roles);
    console.log('Roles created successfully.');
  }
}
