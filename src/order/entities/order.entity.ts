import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { ProductOrder } from 'src/product/entities/product-order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, (user) => user.orders) user: User;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  products!: ProductOrder[];

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
