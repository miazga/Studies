import { StudyState } from './StudyState';

export interface UpdateStudyCommand {
  id: string;
  name: string;
  state: StudyState;
}
