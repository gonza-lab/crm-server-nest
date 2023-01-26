import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../auth/enums/role.enum';
import { Payload } from '../auth/interfaces/payload.interface';
import { OrderStatus } from '../order-status/entities/order-status.entity';
import { ProductOrder } from '../product/entities/product-order.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
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

  async create({ products, status, userId }: CreateOrderDto) {
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

  async findAll(options?: FindManyOptions<Order>) {
    options = {
      ...options,
      relations: ['user', 'products', 'products.product', 'status'],
      order: {
        updated_at: 'DESC',
      },
    };

    const [data, total_count] = await this.orderRepository.findAndCount(
      options,
    );

    return { data, total_count, count: data.length };
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

  async update(id: number, { status, products }: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ id });

    if (!order) throw new NotFoundException('Order not found');

    if (status) {
      const orderStatus = await this.orderStatusRepository.findOne({
        id: status,
      });

      if (!orderStatus) throw new NotFoundException('OrderStatus not found');

      order.status = orderStatus;
    }

    if (products) {
      const productOrders = await this.productOrderRepository.find({
        where: {
          orderId: order.id,
        },
        relations: ['product'],
      });

      const productsOrdersToRemove: ProductOrder[] = [];
      const productsOrdersToSave: ProductOrder[] = [];
      const productsToSave: Product[] = [];

      productOrders.forEach((productOrder) => {
        const product = products.find(
          (product_) => product_.id === productOrder.productId,
        );

        if (!product) {
          productsOrdersToRemove.push(productOrder);
          productsToSave.push({
            ...productOrder.product,
            stock: productOrder.product.stock + productOrder.quantity,
          });
        } else if (
          product.quantity - productOrder.quantity <=
          productOrder.product.stock
        ) {
          productsOrdersToSave.push({
            ...productOrder,
            quantity: product.quantity,
          });

          productsToSave.push({
            ...productOrder.product,
            stock:
              productOrder.product.stock +
              productOrder.quantity -
              product.quantity,
          });
        }
      });

      for (const product of products) {
        if (
          !productOrders.find(
            (productOrder) => productOrder.productId === product.id,
          )
        ) {
          const productDB = await this.productRepository.findOne({
            where: { id: product.id },
          });

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
      }

      await this.productOrderRepository.remove(productsOrdersToRemove);
      await this.productOrderRepository.save(productsOrdersToSave);
      await this.productRepository.save(productsToSave);
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
