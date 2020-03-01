import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { IconButton } from 'react-native-paper';

import StationsView from '../components/StationsView';
import { getStudyStations } from '../data';
import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

type ResultsScreenProps = {
  route: RouteProp<RootStackParamList, 'Results'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const ResultsScreen = ({ route, navigation }: ResultsScreenProps) => {
  const { study } = route.params;

  const [stations, setStations] = React.useState<number[]>([]);
  React.useEffect(() => {
    getStations();
  }, []);

  const getStations = async () => {
    const result = await getStudyStations({ id: study.id });
    setStations(result);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="content-paste"
          size={20}
          color="white"
          onPress={() => navigation.navigate('StudyDetails', { study })}
        />
      ),
    });
  }, []);

  return (
    <BaseScreen>
      {stations.length > 0 && <StationsView stations={stations} studyId={study.id} />}
    </BaseScreen>
  );
};

export default ResultsScreen;
