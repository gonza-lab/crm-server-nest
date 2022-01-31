import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
  ) {}

  async create(
    userId: number,
    { products: productsId, status }: CreateOrderDto,
  ) {
    const products = await this.productRepository.findByIds(productsId);

    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const orderStatus = await this.orderStatusRepository.findOne({
      id: status,
    });
    if (!orderStatus) throw new NotFoundException('OrderStatus not found');

    const order = await this.orderRepository.save({
      products,
      user,
      status: orderStatus,
    });

    return order;
  }

  findAll(user: Payload) {
    const options: FindManyOptions<Order> = {
      relations: ['user', 'products'],
    };

    if (user.role.name !== Role.admin) {
      options.where = { user: { id: user.id } };
    }

    return this.orderRepository.find(options);
  }

  findOne(id: number, user: Payload) {
    let conditions: FindConditions<Order> = {
      id,
    };

    const options: FindOneOptions<Order> = {
      relations: ['user', 'products'],
    };

    if (user.role.name === Role.customer)
      conditions = { ...conditions, user: { id: user.id } };

    return this.orderRepository.findOne(conditions, options);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number, user: Payload) {
    let conditions: FindConditions<Order> = {
      id,
    };

    if (user.role.name === Role.customer)
      conditions = { ...conditions, user: { id: user.id } };

    await this.orderRepository.delete(conditions);
  }
}
