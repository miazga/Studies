import moment from 'moment';
import * as React from 'react';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Surface, Text, DataTable, ActivityIndicator } from 'react-native-paper';

import { getStudyResults } from '../data';
import { Result } from '../data/models';
import baseUri from '../websocket';

const itemsPerPage = 5;

type StationDetailsProps = {
  studyId: string;
  stationId: number;
};

const StationDetails = ({ studyId, stationId }: StationDetailsProps) => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [page, setPage] = React.useState(0);
  const [totalResults, setTotalResults] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getResults();
  }, [page]);

  const getResults = async () => {
    const result = await getStudyResults({ id: studyId, page, results: itemsPerPage, stationId });
    setTotalPages(result.totalPages);
    setTotalResults(result.totalResults);
    setResults(result.items);
    setLoading(false);
  };
  // websockets doesnt work on web due to usecure connection - SSL/TLS setup required on server side
  if (Platform.OS !== 'web') {
    const webSocket = React.useRef(
      new WebSocket(`${baseUri}/studyresults?id=${studyId}&stationId=${stationId}`)
    );
    const startConnection = React.useCallback(() => {
      webSocket.current.onmessage = e => {
        const item = JSON.parse(e.data) as Result;
        setResults(items => {
          items.pop();
          return [item, ...items];
        });
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
          <DataTable.Title numeric>SensorId</DataTable.Title>
          <DataTable.Title numeric>Value</DataTable.Title>
        </DataTable.Header>
        {loading ? (
          <ActivityIndicator />
        ) : (
          results.map(item => (
            <DataTable.Row key={item.created}>
              <DataTable.Cell>{moment(item.created).format('DD MMM HH:mm')}</DataTable.Cell>
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

export default StationDetails;
