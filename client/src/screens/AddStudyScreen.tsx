import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';

import { addStudy } from '../data';
import { RootStackParamList } from '../providers/NavigationProvider';
import BaseScreen from './BaseScreen';

type AddStudyScreenProps = {
  route: RouteProp<RootStackParamList, 'AddStudy'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const AddStudyScreen = ({ route, navigation }: AddStudyScreenProps) => {
  const { onSubmit } = route.params;
  const [name, setName] = React.useState<string>('');

  const handleSave = async () => {
    await addStudy({ name });
    await onSubmit();
    navigation.goBack();
  };

  return (
    <BaseScreen>
      <TextInput label="Name" value={name} onChangeText={setName} />
      <Button icon="content-save" mode="contained" onPress={handleSave}>
        Save
      </Button>
    </BaseScreen>
  );
};

export default AddStudyScreen;
