import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';

export class Product {
  @IsInt() @Min(1) id: number;
  @IsInt() @Min(1) quantity: number;
}
export class CreateOrderDto {
  @IsInt() status: number;
  @IsInt() userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Product)
  products: Product[];
}
