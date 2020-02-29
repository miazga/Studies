import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading, DataTable, ActivityIndicator } from 'react-native-paper';

import { getStudyResults } from '../data';
import { Result } from '../data/models';
import { RootStackParamList } from '../providers/NavigationProvider';
import baseUri from '../websocket';
import BaseScreen from './BaseScreen';

const results = 5;

type ResultsListProps = {
  studyId: string;
};

const ResultsList = ({ studyId }: ResultsListProps) => {
  const [items, setItems] = React.useState<Result[]>([]);
  const [page, setPage] = React.useState(0);
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

  const webSocket = React.useRef(new WebSocket(`${baseUri}/studyresults?id=${studyId}`));
  // const webSocket = React.useRef({ current: {} });

  const startConnection = React.useCallback(() => {
    webSocket.current.onmessage = e => {
      const item = JSON.parse(e.data) as Result;
      setItems(items => {
        items.pop();
        return [item, ...items];
      });
      setTotalResults(totalResults => totalResults + 1);
    };
  }, []);

  const cancelConnection = React.useCallback(() => {
    webSocket.current.close();
  }, []);

  React.useEffect(() => {
    startConnection();
    return () => {
      cancelConnection();
    };
  }, []);

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
          <DataTable.Row key={item.created}>
            <DataTable.Cell>{moment(item.created).format('DD MMM HH:mm')}</DataTable.Cell>
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
          totalResults
        )} of ${totalResults}`}
      />
    </DataTable>
  );
};

type ResultsScreenProps = {
  route: RouteProp<RootStackParamList, 'Results'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const ResultsScreen = ({ route }: ResultsScreenProps) => {
  const { study } = route.params;
  return (
    <BaseScreen>
      <View style={styles.row}>
        <Subheading>Id</Subheading>
        <Subheading>{study.id}</Subheading>
      </View>
      <View style={styles.row}>
        <Subheading>Created</Subheading>
        <Subheading>{moment(study.created).format('DD MMM YYYY HH:mm')}</Subheading>
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
