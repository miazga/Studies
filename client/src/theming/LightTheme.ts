import { DefaultTheme } from 'react-native-paper';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1a237e',
    accent: '#000051',
    backdrop: 'rgba(255, 255, 255, 0.92)',
  },
};

export default LightTheme;
