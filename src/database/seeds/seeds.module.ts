import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { Role } from 'src/role/entities/role.entity';

import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';
import { RoleSeed } from './role.seed';

import { UserSeed } from './user.seed';

@Module({
  imports: [CommandModule, TypeOrmModule.forFeature([User, Role])],
  providers: [UserSeed, UserService, RoleSeed],
  exports: [UserSeed, RoleSeed],
})
export class SeedsModule {}
