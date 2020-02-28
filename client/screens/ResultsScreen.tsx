import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BaseScreen from './BaseScreen';

const ResultsScreen = () => {
  return (
    <BaseScreen style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </BaseScreen>
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

export default ResultsScreen;
