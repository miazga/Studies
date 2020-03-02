import PropTypes from 'prop-types';
import React from 'react';
import { Text, Colors } from 'react-native-paper';

const ValueTime = ({ children, selected, marginRight }) => (
  <Text
    style={{
      color: selected ? '#fff' : Colors.grey100,
      height: 30,
      lineHeight: 30,
      marginRight,
      overflow: 'hidden',
      textAlign: 'center',
      width: 30,
    }}>
    {children}
  </Text>
);

ValueTime.propTypes = {
  children: PropTypes.string,
  selected: PropTypes.bool,
};

export default ValueTime;
