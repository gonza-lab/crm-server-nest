import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existsRole = await this.roleService.findOne(createUserDto.role);

    if (!existsRole) {
      throw new NotFoundException('Role not found');
    }

    return this.userRepository.insert({ ...createUserDto, role: existsRole });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, { relations: ['role'] });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
