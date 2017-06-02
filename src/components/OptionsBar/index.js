import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import styled from 'styled-components/native';

const Bar = styled.View`
  flexDirection: row;
  flexWrap: wrap;
  justifyContent: center;
`;

const BarItem = styled.Button`
  flex: 2;
  backgroundColor: ${(props) => props.selected ? 'red' : '#fefefe'}
`;

class OptionsBar extends Component {

  render() {
    return (
      <Bar>
        {this.props.options.map((option) => <BarItem selected onPress={this.props.onOptionSelect.bind(this, option)} title={option} />)}
      </Bar>
    );
  }
}

OptionsBar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
};

OptionsBar.defaultProps = {
  options: [],
};

export default OptionsBar;
