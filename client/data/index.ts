import { axios } from '../axios';
import { AddStudyCommand } from './models/AddStudyCommand';
import { AddStudyResultCommand } from './models/AddStudyResultCommand';
import { GetStudiesQuery, GetStudiesQueryResponse } from './models/GetStudiesQuery';
import { UpdateStudyCommand } from './models/UpdateStudyCommand';

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

export { getStudies, addStudy, updateStudy, addStudyResult };
