import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entities/OrderStatus';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  exports: [TypeOrmModule.forFeature([OrderStatus])],
})
export class OrderStatusModule {}
