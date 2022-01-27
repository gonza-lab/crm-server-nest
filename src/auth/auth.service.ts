import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
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
    const user = await this.userService.findOne({ email });

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  login(user: User) {
    const payload: Payload = { id: user.id, role: user.role };

    return { access_token: this.jwtService.sign(payload) };
  }
}
