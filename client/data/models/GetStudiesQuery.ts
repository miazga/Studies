interface GetStudiesQuery {
  search?: string;
  page?: number;
  results?: number;
}

interface GetStudiesQueryResponse {
  items: Study[];
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
}
