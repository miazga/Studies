import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const TrendIndicatorText = ({ children, direction }) => (
  <View
    style={{
      flexDirection: 'row',
    }}>
    <View
      style={{
        justifyContent: 'center',
      }}>
      {/* <Icon
        color={direction ? 'green' : 'red'}
        name="arrow"
        direction={direction ? 'left' : 'right'}
      /> */}
    </View>
    <Text
      style={{
        color: direction ? 'green' : 'red',
        lineHeight: 17,
        paddingLeft: 2,
      }}>
      {children}
    </Text>
  </View>
);

TrendIndicatorText.propTypes = {
  children: PropTypes.string,
  direction: PropTypes.string,
};

export default TrendIndicatorText;
