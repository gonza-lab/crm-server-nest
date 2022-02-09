import { IsInt, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString() name: string;
  @IsInt() price: number;
  @IsInt() @Min(0) stock: number;
}
