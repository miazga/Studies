import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Subheading, DataTable, ActivityIndicator } from 'react-native-paper';

import { getStudyResults } from '../data';
import { Result } from '../data/models';
import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

type ResultsListProps = {
  studyId: string;
};

const ResultsList = ({ studyId }: ResultsListProps) => {
  const [items, setItems] = React.useState<Result[]>([]);
  const [page, setPage] = React.useState(0);
  const [results] = React.useState(3);
  const [totalResults, setTotalResults] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getItems();
  }, [page]);

  const getItems = async () => {
    setLoading(true);
    const result = await getStudyResults({ id: studyId, page, results });
    setTotalPages(result.totalPages);
    setTotalResults(result.totalResults);
    setItems(result.items);
    setLoading(false);
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Created</DataTable.Title>
        <DataTable.Title numeric>StationId</DataTable.Title>
        <DataTable.Title numeric>SensorId</DataTable.Title>
        <DataTable.Title numeric>Value</DataTable.Title>
      </DataTable.Header>
      {loading ? (
        <ActivityIndicator />
      ) : (
        items.map(item => (
          <DataTable.Row>
            <DataTable.Cell>{item.created}</DataTable.Cell>
            <DataTable.Cell numeric>{item.stationId}</DataTable.Cell>
            <DataTable.Cell numeric>{item.sensorId}</DataTable.Cell>
            <DataTable.Cell numeric>{item.value}</DataTable.Cell>
          </DataTable.Row>
        ))
      )}
      <DataTable.Pagination
        page={page}
        numberOfPages={totalPages}
        onPageChange={page => setPage(page)}
        label={`${page * results + 1} - ${Math.min(
          page * results + results,
          items.length
        )} of ${totalResults}`}
      />
    </DataTable>
  );
};

type ResultsScreenProps = {
  route: RouteProp<RootStackParamList, 'Results'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const ResultsScreen = ({ route, navigation }: ResultsScreenProps) => {
  const { study } = route.params;
  return (
    <BaseScreen>
      <View style={styles.row}>
        <Subheading>Id</Subheading>
        <Subheading>{study.id}</Subheading>
      </View>
      <View style={styles.row}>
        <Subheading>Created</Subheading>
        <Subheading>{moment(study.created).format('DD MMM HH:mm')}</Subheading>
      </View>
      <View style={styles.row}>
        <Subheading>State</Subheading>
        <Subheading>{study.state}</Subheading>
      </View>
      <ResultsList studyId={study.id} />
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ResultsScreen;
