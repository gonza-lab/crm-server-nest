import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from '../order-status/entities/order-status.entity';
import { Order } from '../order/entities/order.entity';
import { ProductOrder } from '../product/entities/product-order.entity';
import { Product } from '../product/entities/product.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Role, Product, Order, ProductOrder, OrderStatus],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SeedsModule,
  ],
})
export class DatabaseModule {}
