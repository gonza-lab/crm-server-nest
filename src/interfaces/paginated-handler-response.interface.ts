export interface PaginatedHandlerResponse<T> {
  data: T;
  total_count: number;
  count: number;
}
