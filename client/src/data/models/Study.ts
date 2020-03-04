import { StudyState } from './StudyState';

export interface Study {
  id: string;
  name: string;
  created: string;
  state: StudyState;
}
