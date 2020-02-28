interface Study {
  name: string;
  results: any[];
  created: string;
  state: StudyState;
}

enum StudyState {
  Enabled,
  Disabled,
}
