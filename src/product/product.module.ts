import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductOrder } from './entities/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOrder])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule.forFeature([Product, ProductOrder]), ProductService],
})
export class ProductModule {}
