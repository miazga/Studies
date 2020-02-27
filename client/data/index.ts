import { axios } from '../axios';

// GET /api​/studies
const getStudies = async (params?: GetStudiesQuery) => {
  const response = await axios.get<GetStudiesQueryResponse>('studies', { params });
  return response.data;
};

// POST /api/study
const addStudy = ({ name }: AddStudyCommand) => axios.post('study', { name });

// PUT /api/study/{id}/result
const addStudyResult = ({ id, stationId, sensorId, value, timestamp }: AddStudyResultCommand) =>
  axios.put(`study/${id}/result`, { stationId, sensorId, value, timestamp });

export { getStudies, addStudy, addStudyResult };
