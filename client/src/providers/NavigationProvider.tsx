import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { withTheme } from 'react-native-paper';

import { Study } from '../data/models/Study';
import AddStudyScreen from '../screens/AddStudyScreen';
import ModifyStudyScreen from '../screens/ModifyStudyScreen';
import ResultsScreen from '../screens/ResultsScreen';
import StudiesScreen from '../screens/StudiesScreen';
import StudyDetailsScreen from '../screens/StudyDetailsScreen';

export type RootStackParamList = {
  Studies: undefined;
  Results: { study: Study };
  ModifyStudy: { study: Study; onSubmit: () => Promise<void> };
  AddStudy: { onSubmit: () => Promise<void> };
  StudyDetails: { study: Study };
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
      <Stack.Screen
        name="ModifyStudy"
        options={({ route }) => ({
          title: `Modify ${route.params.study.name}`,
        })}
        component={ModifyStudyScreen}
      />
      <Stack.Screen
        name="AddStudy"
        options={() => ({
          title: `Add a new study`,
        })}
        component={AddStudyScreen}
      />
      <Stack.Screen
        name="StudyDetails"
        options={({ route }) => ({
          title: `${route.params.study.name} details`,
        })}
        component={StudyDetailsScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default withTheme(NavigationProvider);
