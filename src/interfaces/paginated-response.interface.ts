interface Pagination {
  offset: number;
  total_count: number;
  count: number;
}

export interface PaginatedResponse {
  pagination: Pagination;
}
