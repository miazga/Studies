import { StackNavigationProp } from '@react-navigation/stack';
import { Linking } from 'expo';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, List, ActivityIndicator, Button, IconButton } from 'react-native-paper';

import api from '../api/config.json';
import StudiesListItem from '../components/StudiesListItem';
import { getStudies } from '../data';
import { Study } from '../data/models';
import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

const baseUrl = __DEV__
  ? `${api.dev.protocol}//${api.dev.host}:${api.dev.port}`
  : `${api.prod.protocol}//${api.prod.host}:${api.prod.port}`;

type StudiesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const StudiesScreen = ({ navigation }: StudiesScreenProps) => {
  const [fabOpened, setFabOpened] = React.useState<boolean>(false);

  const [items, setItems] = React.useState<Study[]>([]);
  //todo handle pagination
  const [page, setPage] = React.useState<number>(0);
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

  const handleAddNewPress = () => {
    navigation.navigate('AddStudy', { onSubmit: loadData });
  };

  const handleRefreshPress = () => {
    // todo handle refresh
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="professional-hexagon"
          size={20}
          color="white"
          onPress={() => Linking.openURL(`${baseUrl}/docs`)}
        />
      ),
    });
  }, []);

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
