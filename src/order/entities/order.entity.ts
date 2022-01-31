import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({}) id: number;

  @ManyToOne(() => User, (user) => user.orders) user: User;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'product_order' })
  products: Product[];

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
