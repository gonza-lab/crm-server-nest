import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  exports: [TypeOrmModule.forFeature([OrderStatus])],
})
export class OrderStatusModule {}
