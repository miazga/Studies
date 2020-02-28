import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { withTheme } from 'react-native-paper';

import NetworkErrorBanner from '../components/NetworkErrorBanner';
import ResultsScreen from '../screens/ResultsScreen';
import StudiesScreen from '../screens/StudiesScreen';

export type RootStackParamList = {
  Studies: undefined;
  Results: { study: Study };
};

const Stack = createStackNavigator<RootStackParamList>();

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
        options={({ route }) => ({ title: route.params.study.name })}
        component={ResultsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default withTheme(NavigationProvider);
