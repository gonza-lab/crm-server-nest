import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { ReadProductPaginatedDto } from 'src/dto/read-product-paginated.dto';

class ReadProductQueryDto {
  @IsOptional()
  @IsString()
  q: string;
}
export class ReadProductDto extends IntersectionType(
  ReadProductQueryDto,
  ReadProductPaginatedDto,
) {}
