import { Order } from '../../order/entities/order.entity';
import { Role } from '../../role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() first_name: string;
  @Column() last_name: string;
  @Column() email: string;
  @Column({ select: false }) password: string;
  @Column() country: string;
  @Column() city: string;
  @Column() locality: string;
  @Column() address: string;
  @Column() zip_code: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Order, (order) => order.user) orders: Order[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
