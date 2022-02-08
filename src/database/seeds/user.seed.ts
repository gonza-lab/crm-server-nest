import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';

const users: CreateUserDto[] = [
  {
    first_name: 'Gonzalo',
    last_name: 'Flores',
    email: 'gonzaflores358@gmail.com',
    password: 'password',
    country: 'Argentina',
    city: 'Buenos Aires',
    locality: 'Laferrere',
    address: 'Ipela 4878',
    zip_code: '1757',
    role: 1,
  },
  {
    first_name: 'Agustina',
    last_name: 'Arias',
    email: 'agusarias@gmail.com',
    password: 'password',
    country: 'Argentina',
    city: 'Buenos Aires',
    locality: 'Laferrere',
    address: 'Ipela 4878',
    zip_code: '1757',
    role: 2,
  },
  {
    first_name: 'Facundo',
    last_name: 'Venialgo',
    email: 'facuvenialgo@gmail.com',
    password: 'password',
    country: 'Argentina',
    city: 'Buenos Aires',
    locality: 'Laferrere',
    address: 'Ipela 4878',
    zip_code: '1757',
    role: 2,
  },
];

@Injectable()
export class UserSeed {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Command({ command: 'create:user', describe: 'Creates a user by seed' })
  async create() {
    for (const user of users) {
      await this.userService.create(user);
    }
    console.log('Users created successfully.');
  }
}
