import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PaginatedDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit = 999;

  @IsOptional()
  @IsString()
  q: string;
}
