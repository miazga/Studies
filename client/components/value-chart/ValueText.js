import PropTypes from 'prop-types';
import React from 'react';
import { View, Dimensions } from 'react-native';
import { Title, Headline } from 'react-native-paper';
import { Transition, Transitioning } from 'react-native-reanimated';

import TrendIndicatorText from './TrendIndicatorText';

const { width } = Dimensions.get('window');

const transition = (
  <Transition.Together>
    <Transition.Out
      durationMs={220}
      type="slide-top"
      propagation="right"
      interpolation="easeInOut"
    />
    <Transition.In durationMs={200} delayMs={120} type="fade" propagation="left" />
  </Transition.Together>
);

class ValueText extends React.Component {
  static propTypes = {
    change: PropTypes.string,
    direction: PropTypes.bool,
    headerText: PropTypes.string,
  };

  state = {
    text: undefined,
  };

  updateValue = text => {
    this.ref.animateNextTransition();
    this.setState({ text });
  };

  render() {
    return (
      <View
        style={{
          height: 85,
          paddingLeft: 15,
          width,
        }}>
        <Transitioning.View ref={ref => (this.ref = ref)} transition={transition}>
          {this.state.text ? (
            <View>
              <Headline>{this.props.headerText}</Headline>
              <Title>${Number(this.state.text).toFixed(2)}</Title>
              <TrendIndicatorText direction={this.props.direction}>
                {Math.abs(Number(this.props.change))}%
              </TrendIndicatorText>
            </View>
          ) : (
            <>
              <Headline>Downloading data...</Headline>
              <Title>Loading...</Title>
            </>
          )}
        </Transitioning.View>
      </View>
    );
  }
}

export default ValueText;
