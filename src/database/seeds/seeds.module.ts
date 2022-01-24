import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { RoleModule } from 'src/role/role.module';

import { UserModule } from 'src/user/user.module';

import { RoleSeed } from './role.seed';

import { UserSeed } from './user.seed';

@Module({
  imports: [CommandModule, UserModule, RoleModule],
  providers: [UserSeed, RoleSeed],
  exports: [UserSeed, RoleSeed],
})
export class SeedsModule {}
