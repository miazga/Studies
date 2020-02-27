import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { getStudies, addStudy, addStudyResult } from '../data';

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
    <View style={styles.container}>
      <Button
        title="Go to Results"
        onPress={() => navigation.navigate('Results', { name: 'XD' })}
      />

      <Button title="Add study" onPress={add} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudiesScreen;
