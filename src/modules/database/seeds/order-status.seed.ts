import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { CreateOrderStatusDto } from '../../order-status/dto/create-order-status.dto';
import { OrderStatus } from '../../order-status/entities/order-status.entity';
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
