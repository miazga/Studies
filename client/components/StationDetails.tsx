import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';
import moment from 'moment';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  DataTable,
  ActivityIndicator,
  List,
  Menu,
  Button,
  Divider,
  withTheme,
  FAB,
  Portal,
  Modal,
} from 'react-native-paper';
import { LineChart, Grid } from 'react-native-svg-charts';

import { getStudyResults, getStudyStationSensors } from '../data';
import { Result } from '../data/models';
import { getPageSize, setPageSize } from '../utils';
import baseUri from '../websocket';

type StationDetailsProps = {
  studyId: string;
  stationId: number;
  theme: Theme;
};

const StationDetails = ({ studyId, stationId, theme }: StationDetailsProps) => {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [fabOpened, setFabOpened] = React.useState(false);
  const [paginationModalVisible, setPaginationModalVisible] = React.useState(false);
  const [sensorId, setSensorId] = React.useState(0);
  const [results, setResults] = React.useState<Result[]>([]);
  const [sensors, setSensors] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [totalResults, setTotalResults] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  React.useEffect(() => {
    getResults();
  }, [page, sensorId, itemsPerPage]);

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

  const getItemsPerPage = async () => {
    const result = await getPageSize();
    setItemsPerPage(result);
  };

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
      getSensors();
      getItemsPerPage();
      startConnection();
      return () => {
        cancelConnection();
      };
    }, []);
  }

  const handleRefreshPress = async () => {
    await getItemsPerPage();
  };

  const handleChangeFilter = (sensorId: number) => {
    setSensorId(sensorId);
    setFilterVisible(false);
  };

  const handleSetItemsPerPage = async (pageSize: number) => {
    setItemsPerPage(pageSize);
    setPaginationModalVisible(false);
    await setPageSize(pageSize);
  };

  return (
    <View>
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
            <Menu.Item
              key={item}
              onPress={() => handleChangeFilter(item)}
              title={`Sensor ${item}`}
            />
          ))}
        </Menu>
        <LineChart
          style={{ height: 200 }}
          data={results}
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => moment(item.created)}
          svg={{ stroke: theme.colors.primary }}
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

      <Portal>
        <FAB.Group
          open={fabOpened}
          visible
          icon={props => <FontAwesome {...props} name="gears" />}
          actions={[
            {
              icon: 'counter',
              label: 'Configure pagination',
              onPress: () => setPaginationModalVisible(true),
            },

            { icon: 'refresh', label: 'Refresh list', onPress: handleRefreshPress },
          ]}
          onStateChange={({ open }) => setFabOpened(open)}
        />
        <Modal visible={paginationModalVisible} onDismiss={() => setPaginationModalVisible(false)}>
          <List.Section title="Pagination">
            <List.Accordion
              title={`${itemsPerPage} items per page`}
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item onPress={() => handleSetItemsPerPage(5)} title="5 items per page" />
              <List.Item onPress={() => handleSetItemsPerPage(10)} title="10 items per page" />
              <List.Item onPress={() => handleSetItemsPerPage(25)} title="25 items per page" />
              <List.Item onPress={() => handleSetItemsPerPage(50)} title="50 items per page" />
            </List.Accordion>
          </List.Section>
        </Modal>
      </Portal>
    </View>
  );
};

export default withTheme(StationDetails);
