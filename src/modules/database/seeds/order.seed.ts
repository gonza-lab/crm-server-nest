import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CreateOrderDto } from '../../order/dto/create-order.dto';
import { OrderService } from '../../order/order.service';

const orders: CreateOrderDto[] = [
  {
    products: [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
    ],
    status: 1,
  },
  {
    products: [
      { id: 3, quantity: 1 },
      { id: 4, quantity: 1 },
      { id: 5, quantity: 1 },
    ],
    status: 1,
  },
];

@Injectable()
export class OrderSeed {
  constructor(private readonly orderService: OrderService) {}

  @Command({ command: 'create:order', describe: 'Creates orders by seed' })
  async create() {
    let userId = 1;
    for (const order of orders) {
      await this.orderService.create(userId, order);
      userId++;
    }

    console.log('Orders created successfully.');
  }
}
