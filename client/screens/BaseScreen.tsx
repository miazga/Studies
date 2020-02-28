import * as React from 'react';
import { View } from 'react-native';

import NetworkErrorBanner from '../components/NetworkErrorBanner';

const BaseScreen = props => {
  return (
    <View>
      <NetworkErrorBanner />
      {props.children}
    </View>
  );
};

export default BaseScreen;
