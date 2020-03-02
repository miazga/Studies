import moment from 'moment';
import * as React from 'react';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Surface,
  Text,
  DataTable,
  ActivityIndicator,
  List,
  Menu,
  Button,
  Divider,
} from 'react-native-paper';
import { LineChart, Grid } from 'react-native-svg-charts';

import { getStudyResults, getStudyStationSensors } from '../data';
import { Result } from '../data/models';
import baseUri from '../websocket';

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

const itemsPerPage = 5;

type StationDetailsProps = {
  studyId: string;
  stationId: number;
};

const StationDetails = ({ studyId, stationId }: StationDetailsProps) => {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [sensorId, setSensorId] = React.useState(0);
  const [results, setResults] = React.useState<Result[]>([]);
  const [sensors, setSensors] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [totalResults, setTotalResults] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getResults();
  }, [page, sensorId]);

  const getResults = async () => {
    const result = await getStudyResults({
      id: studyId,
      page,
      results: itemsPerPage,
      stationId,
      sensorId,
    });
    setTotalPages(result.totalPages);
    setTotalResults(result.totalResults);
    setResults(result.items);
    setLoading(false);
  };

  React.useEffect(() => {
    getSensors();
  }, []);

  const getSensors = async () => {
    const result = await getStudyStationSensors({ id: studyId, stationId });
    setSensors(result);
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

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const handleChangeFilter = (sensorId: number) => {
    setSensorId(sensorId);
    setFilterVisible(false);
  };

  return (
    <ScrollView>
      <Menu
        visible={filterVisible}
        onDismiss={() => setFilterVisible(false)}
        anchor={
          <Button onPress={() => setFilterVisible(true)}>
            {sensorId === 0 ? 'All sensors' : `Sensor ${sensorId}`}
          </Button>
        }>
        <Menu.Item onPress={() => handleChangeFilter(0)} title="All sensors" />
        <Divider />
        {sensors.map(item => (
          <Menu.Item onPress={() => handleChangeFilter(item)} title={`Sensor ${item}`} />
        ))}
      </Menu>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={{ top: 20, bottom: 20 }}>
        <Grid />
      </LineChart>
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
              <DataTable.Cell>{moment(item.created).format('DD MMM YYYY HH:mm')}</DataTable.Cell>
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
