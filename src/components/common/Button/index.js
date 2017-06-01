import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  }
}

const Button = (props) => {
  const { buttonStyle, textStyle } = styles;
  const { children, onPress } = props;
  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export {
  Button,
};
