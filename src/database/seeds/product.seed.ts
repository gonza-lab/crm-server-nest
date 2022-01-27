import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';

const products: CreateProductDto[] = [
  {
    name: 'Alimento balanceado para gatos 1KG',
    price: 8000,
  },
  {
    name: 'Alimento balanceado para perros 1KG',
    price: 5000,
  },
];

@Injectable()
export class ProductSeed {
  constructor(private readonly productService: ProductService) {}

  @Command({ command: 'create:product', describe: 'Creates a product by seed' })
  async create() {
    for (const product of products) {
      await this.productService.create(product);
    }
    console.log('Products created successfully.');
  }
}
