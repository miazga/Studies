import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Subheading,
  DataTable,
  ActivityIndicator,
  Portal,
  FAB,
  Modal,
  List,
} from 'react-native-paper';

import { getStudyResults } from '../data';
import { Result } from '../data/models';
import { RootStackParamList } from '../providers/NavigationProvider';
import { getPageSize, setPageSize } from '../utils';
import baseUri from '../websocket';
import BaseScreen from './BaseScreen';

type ResultsListProps = {
  studyId: string;
};

const ResultsList = ({ studyId }: ResultsListProps) => {
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [fabOpened, setFabOpened] = React.useState(false);
  const [paginationModalVisible, setPaginationModalVisible] = React.useState(false);
  const [results, setResults] = React.useState<Result[]>([]);
  const [page, setPage] = React.useState(0);
  const [totalResults, setTotalResults] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getResults();
  }, [page, itemsPerPage]);

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
      getItemsPerPage();
      startConnection();
      return () => {
        cancelConnection();
      };
    }, []);
  }

  const getItemsPerPage = async () => {
    const result = await getPageSize();
    setItemsPerPage(result);
  };

  const handleSetItemsPerPage = async (pageSize: number) => {
    setItemsPerPage(pageSize);
    setPaginationModalVisible(false);
    await setPageSize(pageSize);
  };

  return (
    <View>
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
