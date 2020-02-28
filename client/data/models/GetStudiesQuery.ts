import { Query } from './Query';

export interface GetStudiesQuery extends Query {
  search?: string;
}
