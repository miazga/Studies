import { DefaultTheme } from 'react-native-paper';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#263238',
    accent: '#28a745',
    backdrop: 'rgba(255, 255, 255, 0.92)',
  },
};

export default LightTheme;
