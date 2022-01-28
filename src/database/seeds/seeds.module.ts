import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { RoleModule } from 'src/role/role.module';

import { UserModule } from 'src/user/user.module';
import { OrderSeed } from './order.seed';
import { ProductSeed } from './product.seed';

import { RoleSeed } from './role.seed';

import { UserSeed } from './user.seed';

@Module({
  imports: [CommandModule, UserModule, RoleModule, ProductModule, OrderModule],
  providers: [UserSeed, RoleSeed, ProductSeed, OrderSeed],
  exports: [UserSeed, RoleSeed, ProductSeed, OrderSeed],
})
export class SeedsModule {}
