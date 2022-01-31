import { IsInt } from 'class-validator';

export class UpdateOrderDto {
  @IsInt() status: number;
}
