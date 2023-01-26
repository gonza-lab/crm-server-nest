import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Product } from './create-order.dto';

export class UpdateOrderDto {
  @IsOptional() @IsInt() status: number;
  @IsOptional() @IsInt() userId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}
