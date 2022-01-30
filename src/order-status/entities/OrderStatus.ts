import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;

  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
