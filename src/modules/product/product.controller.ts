import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { ProductService } from './product.service';

import { Roles } from '../auth/decorators/roles.decorator';
import { Paginated } from 'src/decorators/paginated.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from '../auth/enums/role.enum';
import { PaginatedHandlerResponse } from '../../interfaces/paginated-handler-response.interface';
import { Product } from './entities/product.entity';
import { ReadProductDto } from './dto/read-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Paginated()
  async findByQuery(
    @Query() query: ReadProductDto,
  ): Promise<PaginatedHandlerResponse<Product[]>> {
    const [data, total_count] = await this.productService.findAll(query.q, {
      where: {},
      skip: query.offset,
      take: query.limit,
    });

    return { data, total_count, count: data.length };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
