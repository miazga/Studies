interface Study {
  id: string;
  name: string;
  created: string;
  state: StudyState;
}

enum StudyState {
  Enabled,
  Disabled,
}
