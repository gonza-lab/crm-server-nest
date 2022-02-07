import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_order')
export class ProductOrder {
  @Column({ type: 'int' }) quantity: number;

  @PrimaryColumn({ type: 'int' })
  productId: number;

  @PrimaryColumn({ type: 'int' })
  orderId: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;
}
