import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading, TextInput, Switch, Button } from 'react-native-paper';

import { updateStudy } from '../data';
import { StudyState } from '../data/models/StudyState';
import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

type ModifyStudyScreenProps = {
  route: RouteProp<RootStackParamList, 'ModifyStudy'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const ModifyStudyScreen = ({ route, navigation }: ModifyStudyScreenProps) => {
  const { study, onSubmit } = route.params;
  const [name, setName] = React.useState<string>(study.name);
  const [state, setState] = React.useState<StudyState>(study.state || StudyState.Enabled);

  const handleSave = async () => {
    await updateStudy({ id: study.id, name, state });
    await onSubmit();
    navigation.goBack();
  };

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
      <TextInput label="Name" value={name} onChangeText={setName} />
      <View style={styles.row}>
        <Subheading>{state}</Subheading>
        <Switch
          value={state === StudyState.Enabled}
          onValueChange={() => {
            setState(state === StudyState.Enabled ? StudyState.Disabled : StudyState.Enabled);
          }}
        />
      </View>
      <Button icon="content-save" mode="contained" onPress={handleSave}>
        Save
      </Button>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ModifyStudyScreen;
