export interface QueryResponse<T> {
  items: T[];
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
}
