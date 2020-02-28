import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import { List, TouchableRipple } from 'react-native-paper';

type StudiesListItemProps = {
  study: Study;
};

const StudiesListItem = ({ study }: StudiesListItemProps) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate('Results', { study });
  };

  const handleItemLongPress = () => {};

  return (
    <TouchableRipple onPress={handleItemPress} onLongPress={handleItemLongPress}>
      <List.Item
        title={study.name}
        description={moment(study.created).format('DD MMM HH:mm')}
        left={props => <List.Icon {...props} icon="folder" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
      />
    </TouchableRipple>
  );
};

export default StudiesListItem;
