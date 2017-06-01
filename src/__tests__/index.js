import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import App from '../';

describe('App', () => {
  it('should render hello world', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.length).toEqual(1);
  });
});
