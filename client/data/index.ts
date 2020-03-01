import { axios } from '../axios';
import {
  GetStudiesQuery,
  AddStudyCommand,
  UpdateStudyCommand,
  AddStudyResultCommand,
  GetStudyResultsQuery,
  Study,
} from './models';
import { GetStudyStationsQuery } from './models/GetStudyStationsQuery';
import { QueryResponse } from './models/QueryResponse';
import { Result } from './models/Result';

// GET /api​/studies
const getStudies = async (params?: GetStudiesQuery) => {
  const response = await axios.get<QueryResponse<Study>>('studies', { params });
  return response.data;
};

// POST /api/study
const addStudy = ({ name }: AddStudyCommand) => axios.post('study', { name });

// PUT /api/study/{id}
const updateStudy = ({ id, name, state }: UpdateStudyCommand) =>
  axios.put(`study/${id}`, { name, state });

// PUT /api/study/{id}/result
const addStudyResult = ({ id, stationId, sensorId, value, timestamp }: AddStudyResultCommand) =>
  axios.put(`study/${id}/result`, { stationId, sensorId, value, timestamp });

// GET /api/study/{id}/results
const getStudyResults = async ({ id, page, results, stationId }: GetStudyResultsQuery) => {
  const response = await axios.get<QueryResponse<Result>>(`study/${id}/results`, {
    params: { page, results, stationId },
  });
  return response.data;
};

// GET /api/study/{id}/stations
const getStudyStations = async ({ id }: GetStudyStationsQuery) => {
  const response = await axios.get<number[]>(`study/${id}/stations`);
  return response.data;
};

export { getStudies, addStudy, updateStudy, addStudyResult, getStudyResults, getStudyStations };
