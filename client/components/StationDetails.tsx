import * as React from 'react';
import { Surface, Text } from 'react-native-paper';

type StationDetailsProps = {
  studyId: string;
  stationId: number;
};

const StationDetails = ({ studyId, stationId }: StationDetailsProps) => (
  <Surface style={{ flex: 1 }}>
    <Text>Surface</Text>
  </Surface>
);

export default StationDetails;
