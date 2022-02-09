import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    return this.userRepository.insert({ ...createUserDto, role: existsRole });
  }

  async update(id: number, { role: roleId, ...updateUserDto }: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      id,
    });

    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, updateUserDto);

    if (roleId) {
      const role = await this.roleService.findOne(roleId);

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      user.role = role;
    }

    await this.userRepository.save(user);
  }

  async findOne(conditions: FindConditions<User>, withPassword?: boolean) {
    const options: FindOneOptions<User> = {
      relations: ['role'],
    };

    if (withPassword) options.select = ['id', 'password'];

    const user = await this.userRepository.findOne(conditions, options);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  query(fullName: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where("CONCAT(user.first_name, ' ', user.last_name) LIKE :fullName", {
        fullName: `%${fullName}%`,
      })
      .getMany();
  }
}
