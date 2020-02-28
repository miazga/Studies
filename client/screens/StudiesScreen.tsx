import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, List, ActivityIndicator } from 'react-native-paper';

import StudiesListItem from '../components/StudiesListItem';
import { getStudies, addStudyResult } from '../data';
import { Study } from '../data/models/Study';
import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

type StudiesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const StudiesScreen = ({ navigation }: StudiesScreenProps) => {
  const [fabOpened, setFabOpened] = React.useState<boolean>(false);

  const [items, setItems] = React.useState<Study[]>([]);
  //todo handle pagination
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await getStudies({ page });
    setItems(result.items);
    setLoading(false);
  };

  const add = async () => {
    await addStudyResult({
      id: 'f8c024eb-8d15-458c-91e0-b7ab86386d12',
      stationId: 1,
      sensorId: 1,
      value: 1,
      timestamp: 1111,
    });
  };

  const handleAddNewPress = () => {
    navigation.navigate('AddStudy', { onSubmit: loadData });
  };

  const handleRefreshPress = () => {};

  return (
    <BaseScreen>
      <List.Section title="Studies">
        {loading && <ActivityIndicator />}
        {items.map(item => (
          <StudiesListItem key={item.created} study={item} onEditSubmit={loadData} />
        ))}
      </List.Section>
      <FAB.Group
        open={fabOpened}
        visible
        icon={fabOpened ? 'close' : 'plus'}
        actions={[
          { icon: 'plus', label: 'Add new', onPress: handleAddNewPress },
          { icon: 'refresh', label: 'Refresh list', onPress: handleRefreshPress },
        ]}
        onStateChange={({ open }) => setFabOpened(open)}
      />
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  fab: {},
});

export default StudiesScreen;
