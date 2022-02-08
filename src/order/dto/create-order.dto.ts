import { Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';

class Product {
  @IsInt() @Min(1) id: number;
  @IsInt() @Min(0) quantity: number;
}
export class CreateOrderDto {
  @IsInt() status: number;
  // @IsNumber({}, { each: true }) products: number[];
  @ValidateNested({ each: true }) @Type(() => Product) products: Product[];
}
