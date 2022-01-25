import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { FindConditions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (existsUser)
      throw new BadRequestException('There is already a user with this email');

    const existsRole = await this.roleService.findOne(createUserDto.role);

    if (!existsRole) {
      throw new NotFoundException('Role not found');
    }

    this.userRepository.insert({ ...createUserDto, role: existsRole });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { role, ...newUser } = updateUserDto;

    this.userRepository.update({ id }, newUser);
  }

  async findOne(conditions: FindConditions<User>) {
    const user = await this.userRepository.findOne(conditions, {
      relations: ['role'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
