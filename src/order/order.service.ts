import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';
import { Payload } from 'src/auth/interfaces/payload.interface';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { ProductOrder } from 'src/product/entities/product-order.entity';
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
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>,
  ) {}

  async create(userId: number, { products, status }: CreateOrderDto) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const orderStatus = await this.orderStatusRepository.findOne({
      id: status,
    });
    if (!orderStatus) throw new NotFoundException('OrderStatus not found');

    const order = await this.orderRepository.save({
      user,
      status: orderStatus,
    });

    const productsDB = await this.productRepository.findByIds(products);

    for (const productDB of productsDB) {
      const product = products.find((product) => product.id === productDB.id);

      if (product.quantity <= productDB.stock) {
        await this.productRepository.save({
          ...productDB,
          stock: productDB.stock - product.quantity,
        });

        await this.productOrderRepository.save({
          productId: productDB.id,
          orderId: order.id,
          quantity: product.quantity,
        });
      }
    }

    return order;
  }

  findAll(user: Payload) {
    const options: FindManyOptions<Order> = {
      relations: ['user', 'products', 'products.product', 'status'],
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
      relations: ['user', 'products', 'products.product', 'status'],
    };

    if (user.role.name === Role.customer)
      conditions = { ...conditions, user: { id: user.id } };

    return this.orderRepository.findOne(conditions, options);
  }

  async update(id: number, { status }: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ id });

    if (!order) throw new NotFoundException('Order not found');

    if (status) {
      const orderStatus = await this.orderStatusRepository.findOne({
        id: status,
      });

      if (!orderStatus) throw new NotFoundException('OrderStatus not found');

      order.status = orderStatus;
    }

    return this.orderRepository.save(order);
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
