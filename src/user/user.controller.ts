import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Req,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':email')
  findById(@Param('email') email: string) {
    return this.userService.findOne({ email });
  }

  @Roles(Role.admin)
  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
