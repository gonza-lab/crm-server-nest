import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  findAll(name?: string, options?: FindManyOptions<Product>) {
    if (name) {
      options = {
        ...options,
        where: { name: ILike(`%${name}%`) },
      };
    }

    return this.productRepository.find(options);
  }

  findOne(id: number) {
    return this.productRepository.findOne({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.save({ id, ...updateProductDto });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
