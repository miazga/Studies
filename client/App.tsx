import * as React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import NavigationProvider from './src/providers/NavigationProvider';
import { RealTimeUpdatesProvider } from './src/providers/RealTimeUpdatesProvider';
import LightTheme from './src/theming/LightTheme';

export default function App() {
  return (
    <PaperProvider theme={LightTheme}>
      <RealTimeUpdatesProvider>
        {Platform.OS === 'web' ? (
          <style type="text/css">{`
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(${require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
        }
      `}</style>
        ) : null}
        <NavigationProvider />
      </RealTimeUpdatesProvider>
    </PaperProvider>
  );
}
