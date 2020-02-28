import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Subheading } from 'react-native-paper';

import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

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
