import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    if (user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
