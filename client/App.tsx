import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import NavigationProvider from './providers/NavigationProvider';
import LightTheme from './theming/LightTheme';

export default function App() {
  return (
    <PaperProvider theme={LightTheme}>
      <NavigationProvider />
    </PaperProvider>
  );
}
