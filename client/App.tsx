import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ResultsScreen from './screens/ResultsScreen';
import StudiesScreen from './screens/StudiesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
}
