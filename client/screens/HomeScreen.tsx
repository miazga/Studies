import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { axios } from '../axios';

const HomeScreen = ({ navigation }) => {
  React.useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const result = await axios.get('Studies');
    console.log(result.data);
  };

  return (
    <View style={styles.container}>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
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

export default HomeScreen;
