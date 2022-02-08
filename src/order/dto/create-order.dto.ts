import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';

class Product {
  @IsInt() @Min(1) id: number;
  @IsInt() @Min(1) quantity: number;
}
export class CreateOrderDto {
  @IsInt() status: number;
  @ValidateNested({ each: true }) @Type(() => Product) products: Product[];
}
