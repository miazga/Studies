import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { List } from 'react-native-paper';

import StudiesList from '../components/StudiesList';
import { getStudies, addStudy, addStudyResult } from '../data';
import BaseScreen from './BaseScreen';

const StudiesScreen = ({ navigation }) => {
  React.useEffect(() => {
    get();
  }, []);

  const get = async () => {
    await getStudies();
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

  return (
    <BaseScreen>
      <StudiesList />
    </BaseScreen>
  );
};

const styles = StyleSheet.create({});

export default StudiesScreen;
