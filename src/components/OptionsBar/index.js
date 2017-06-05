import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import styled from 'styled-components/native';

// the containing view of the bar items
const Bar = styled.View`
  flexDirection: row;
  flexWrap: wrap;
  justifyContent: center;
`;

// a bar button for an option
const BarItem = styled(Button)`
  flex: 2;
`;

// the options bar for group selection
class OptionsBar extends Component {

  render() {
    return (
      <Bar>
        {this.props.options.map((option, index) => 
          <BarItem 
            raised
            color={this.props.selectedOption === index ? 'red' : 'green'}
            key={option}
            onPress={this.props.onOptionSelect.bind(this, option)}
            title={option}
          />)
        }
      </Bar>
    );
  }
}

OptionsBar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

OptionsBar.defaultProps = {
  options: [],
};

export default OptionsBar;
