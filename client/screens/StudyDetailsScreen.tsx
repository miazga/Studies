import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Subheading, DataTable, ActivityIndicator } from 'react-native-paper';

import { getStudyResults } from '../data';
import { Result } from '../data/models';
import { RootStackParamList } from '../providers/NavigationProvider';
import baseUri from '../websocket';
import BaseScreen from './BaseScreen';

const itemsPerPage = 5;

type ResultsListProps = {
  studyId: string;
};

const ResultsList = ({ studyId }: ResultsListProps) => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [page, setPage] = React.useState(0);
  const [totalResults, setTotalResults] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getResults();
  }, [page]);

  const getResults = async () => {
    const result = await getStudyResults({ id: studyId, page, results: itemsPerPage });
    setTotalPages(result.totalPages);
    setTotalResults(result.totalResults);
    setResults(result.items);
    setLoading(false);
  };

  // websockets doesnt work on web due to usecure connection - SSL/TLS setup required on server side
  if (Platform.OS !== 'web') {
    const webSocket = React.useRef(new WebSocket(`${baseUri}/studyresults?id=${studyId}`));

    const startConnection = React.useCallback(() => {
      webSocket.current.onmessage = e => {
        const item = JSON.parse(e.data) as Result;
        setResults(items => {
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
  }

  return (
    <ScrollView>
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
          results.map(item => (
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
          label={`${page * itemsPerPage + 1} - ${Math.min(
            page * itemsPerPage + itemsPerPage,
            totalResults
          )} of ${totalResults}`}
        />
      </DataTable>
    </ScrollView>
  );
};

type StudyDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Results'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const StudyDetailsScreen = ({ route }: StudyDetailsScreenProps) => {
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

export default StudyDetailsScreen;
