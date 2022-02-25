import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';

const users: CreateUserDto[] = [
  {
    first_name: 'Brad',
    last_name: 'Gibson',
    email: 'brad.gibson@example.com',
    password: 'password',
    country: 'United States',
    city: 'Waterford',
    locality: 'Kilcoole',
    address: '9278 New Road',
    zip_code: '1757',
    role: 1,
  },
  {
    first_name: 'Byron',
    last_name: 'Hunt',
    email: 'byron.hunt@example.com',
    password: 'password',
    country: 'Argentina',
    city: 'Buenos Aires',
    locality: 'Laferrere',
    address: '9325 Mockingbird Hill',
    zip_code: '1757',
    role: 2,
  },
  {
    first_name: 'Claudia',
    last_name: 'Evans',
    email: 'claudia.evans@example.com',
    password: 'password',
    country: 'Argentina',
    city: 'Buenos Aires',
    locality: 'Laferrere',
    address: '6048 Mcclellan Rd',
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
