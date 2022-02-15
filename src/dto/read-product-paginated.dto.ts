import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ReadProductPaginatedDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit = 999;
}
