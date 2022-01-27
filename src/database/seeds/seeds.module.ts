import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ProductModule } from 'src/product/product.module';
import { RoleModule } from 'src/role/role.module';

import { UserModule } from 'src/user/user.module';
import { ProductSeed } from './product.seed';

import { RoleSeed } from './role.seed';

import { UserSeed } from './user.seed';

@Module({
  imports: [CommandModule, UserModule, RoleModule, ProductModule],
  providers: [UserSeed, RoleSeed, ProductSeed],
  exports: [UserSeed, RoleSeed, ProductSeed],
})
export class SeedsModule {}
