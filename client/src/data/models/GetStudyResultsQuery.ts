import { Query } from './Query';

export interface GetStudyResultsQuery extends Query {
  id: string;
  stationId?: number;
  sensorId?: number;
}
