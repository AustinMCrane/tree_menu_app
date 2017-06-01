import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

const CardSection = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};


export {
  CardSection,
};
