import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { CreateOrderStatusDto } from 'src/order-status/dto/create-order-status.dto';
import { OrderStatus } from 'src/order-status/entities/OrderStatus';
import { Repository } from 'typeorm';

const orderStatuses: CreateOrderStatusDto[] = [
  {
    name: 'PENDIENTE',
  },
  {
    name: 'APROBADA',
  },
  {
    name: 'RECHAZADA',
  },
];

@Injectable()
export class OrderStatusSeed {
  constructor(
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
  ) {}

  @Command({ command: 'create:order-status' })
  async create() {
    await this.orderStatusRepository.insert(orderStatuses);
    console.log('OrdersStatus created successfully.');
  }
}
