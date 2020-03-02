import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import StationDetails from './StationDetails';

type StationsViewProps = {
  studyId: string;
  stations: number[];
};

const Tab = createMaterialTopTabNavigator();

const StationsView = ({ stations, studyId }: StationsViewProps) => (
  <Tab.Navigator lazy>
    {stations.map(item => (
      <Tab.Screen key={item} name={`Station ${item}`}>
        {props => <StationDetails {...props} studyId={studyId} stationId={item} />}
      </Tab.Screen>
    ))}
  </Tab.Navigator>
);

export default StationsView;
