import { axios } from '../axios';
import {
  GetStudiesQuery,
  GetStudiesQueryResponse,
  AddStudyCommand,
  UpdateStudyCommand,
  AddStudyResultCommand,
  GetStudyResultsQuery,
} from './models';

// GET /api​/studies
const getStudies = async (params?: GetStudiesQuery) => {
  const response = await axios.get<GetStudiesQueryResponse>('studies', { params });
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
const getStudyResults = ({ id }: GetStudyResultsQuery) => axios.get(`study/${id}/results`);

export { getStudies, addStudy, updateStudy, addStudyResult };
