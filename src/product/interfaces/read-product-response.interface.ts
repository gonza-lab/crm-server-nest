import { PaginatedResponse } from 'src/interfaces/paginated-response.interface';
import { Product } from '../entities/product.entity';

export interface ReadProductResponse extends PaginatedResponse {
  data: Product[];
}
