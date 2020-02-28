import { Study } from './Study';

export interface GetStudiesQuery {
  search?: string;
  page?: number;
  results?: number;
}

export interface GetStudiesQueryResponse {
  items: Study[];
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
}
