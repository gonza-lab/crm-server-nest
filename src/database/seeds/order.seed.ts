import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { OrderService } from 'src/order/order.service';

const orders: CreateOrderDto[] = [
  {
    products: [1, 2],
  },
  {
    products: [3, 4, 5],
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
