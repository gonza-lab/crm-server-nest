import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductOrder } from './product-order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() price: number;
  @Column() stock: number;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
  orders!: ProductOrder[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
