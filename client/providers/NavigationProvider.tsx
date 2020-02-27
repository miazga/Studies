import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { withTheme } from 'react-native-paper';

import ResultsScreen from '../screens/ResultsScreen';
import StudiesScreen from '../screens/StudiesScreen';

const Stack = createStackNavigator();

const NavigationProvider = ({ theme }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Studies" component={StudiesScreen} />
      <Stack.Screen
        name="Results"
        //@ts-ignore
        options={({ route }) => ({ title: route.params.name })}
        component={ResultsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default withTheme(NavigationProvider);
