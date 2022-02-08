import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductService } from 'src/product/product.service';

const products: CreateProductDto[] = [
  {
    name: 'Alimento balanceado para gatos 1KG',
    price: 8000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para perros 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para conejos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para jirafas 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para elefantes 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para dinosaurios 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para chanchos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para mariposas 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para murcielagos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para serpientes 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para pericos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para loros 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para tiburos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para caballos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para leones 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para arañas 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para hamsters 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para ratas 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para gepardos 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para peces 1KG',
    price: 5000,
    stock: 100,
  },
  {
    name: 'Alimento balanceado para kiwis 1KG',
    price: 5000,
    stock: 100,
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
