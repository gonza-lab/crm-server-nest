import { IsInt, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsInt() status: number;
  @IsNumber({}, { each: true }) products: number[];
}
