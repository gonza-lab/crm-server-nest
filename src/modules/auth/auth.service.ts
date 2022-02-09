import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Payload } from './interfaces/payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email }, true);

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  getJwt(user: User) {
    const payload: Payload = { id: user.id, role: user.role };

    return this.jwtService.sign(payload);
  }

  async login(user: User) {
    return {
      ...(await this.userService.findOne({ id: user.id })),
      access_token: this.getJwt(user),
    };
  }
}
