import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { OrderStatusModule } from '../../order-status/order-status.module';
import { OrderModule } from '../../order/order.module';
import { ProductModule } from '../../product/product.module';
import { RoleModule } from '../../role/role.module';

import { UserModule } from '../../user/user.module';
import { OrderStatusSeed } from './order-status.seed';
import { OrderSeed } from './order.seed';
import { ProductSeed } from './product.seed';

import { RoleSeed } from './role.seed';

import { UserSeed } from './user.seed';

@Module({
  imports: [
    CommandModule,
    UserModule,
    RoleModule,
    ProductModule,
    OrderModule,
    OrderStatusModule,
  ],
  providers: [UserSeed, RoleSeed, ProductSeed, OrderSeed, OrderStatusSeed],
  exports: [UserSeed, RoleSeed, ProductSeed, OrderSeed, OrderStatusSeed],
})
export class SeedsModule {}
