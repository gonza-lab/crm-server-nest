import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderStatusModule } from '../order-status/order-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductModule,
    UserModule,
    OrderStatusModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule.forFeature([Order]), OrderService],
})
export class OrderModule {}
